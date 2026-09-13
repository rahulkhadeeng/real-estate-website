package com.keylo.infrastructure.web.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/uploads")
public class AdminUploadController {
    private static final int MAX_IMAGES = 5;
    private static final long MAX_IMAGE_SIZE = 5L * 1024 * 1024; // 5 MB

    private final String uploadThingToken;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public AdminUploadController(
        @Value("${uploadthing.token:}") String uploadThingToken,
        ObjectMapper objectMapper
    ) {
        this.uploadThingToken = uploadThingToken != null ? uploadThingToken.trim() : "";
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(@RequestPart("files") List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            return ResponseEntity.badRequest().body(new UploadError("Please select at least one image file."));
        }
        if (files.size() > MAX_IMAGES) {
            return ResponseEntity.badRequest().body(new UploadError("Maximum " + MAX_IMAGES + " images allowed per upload."));
        }

        try {
            List<String> urls = new ArrayList<>();
            for (MultipartFile file : files) {
                validate(file);
                if (isUploadThingConfigured()) {
                    urls.add(uploadToUploadThing(file));
                } else {
                    // Fallback to data URL base64 format for zero-external-dependency immediate preview
                    String base64Image = "data:" + file.getContentType() + ";base64," + Base64.getEncoder().encodeToString(file.getBytes());
                    urls.add(base64Image);
                }
            }
            return ResponseEntity.ok(new UploadedImages(urls));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(new UploadError(ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new UploadError(ex.getMessage() != null ? ex.getMessage() : "Failed to upload image."));
        }
    }

    private boolean isUploadThingConfigured() {
        return !uploadThingToken.isBlank() && !uploadThingToken.contains("dummy") && uploadThingToken.length() > 20;
    }

    private void validate(MultipartFile file) {
        if (file.isEmpty() || file.getSize() > MAX_IMAGE_SIZE) {
            throw new IllegalArgumentException("Each image must be 5 MB or smaller.");
        }
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only valid image formats (JPEG, PNG, WebP, AVIF) are allowed.");
        }
    }

    private String uploadToUploadThing(MultipartFile file) throws Exception {
        String requestJson = objectMapper.writeValueAsString(
            new PrepareUpload(file.getContentType(), safeName(file), file.getSize(), "public-read")
        );

        HttpRequest prepareRequest = HttpRequest.newBuilder(URI.create("https://api.uploadthing.com/v7/prepareUpload"))
            .header("Content-Type", "application/json")
            .header("X-Uploadthing-Api-Key", apiKey())
            .header("X-Uploadthing-Fe-Package", "keylo-spring")
            .header("X-Uploadthing-Version", "7.7.4")
            .POST(HttpRequest.BodyPublishers.ofString(requestJson))
            .build();

        HttpResponse<String> prepared = httpClient.send(prepareRequest, HttpResponse.BodyHandlers.ofString());
        if (prepared.statusCode() / 100 != 2) {
            throw new IllegalStateException("UploadThing prepare failed: " + prepared.body());
        }

        JsonNode preparedJson = objectMapper.readTree(prepared.body());
        String signedUrl = preparedJson.path("url").asText();
        if (signedUrl.isBlank()) {
            throw new IllegalStateException("UploadThing did not return an upload URL");
        }

        String boundary = "Keylo" + UUID.randomUUID();
        HttpRequest uploadRequest = HttpRequest.newBuilder(URI.create(signedUrl))
            .header("Content-Type", "multipart/form-data; boundary=" + boundary)
            .PUT(HttpRequest.BodyPublishers.ofByteArray(multipart(boundary, file)))
            .build();

        HttpResponse<String> uploaded = httpClient.send(uploadRequest, HttpResponse.BodyHandlers.ofString());
        if (uploaded.statusCode() / 100 != 2) {
            throw new IllegalStateException("UploadThing file transfer failed");
        }

        JsonNode uploadedJson = objectMapper.readTree(uploaded.body());
        String directUrl = uploadedJson.path("url").asText(uploadedJson.path("data").path("url").asText());
        if (!directUrl.isBlank()) return directUrl;

        String key = preparedJson.path("key").asText(preparedJson.path("fileKey").asText());
        if (key.isBlank()) throw new IllegalStateException("UploadThing did not return a file key");
        return "https://utfs.io/f/" + key;
    }

    private static byte[] multipart(String boundary, MultipartFile file) throws Exception {
        ByteArrayOutputStream body = new ByteArrayOutputStream();
        String headers = "--" + boundary + "\r\nContent-Disposition: form-data; name=\"file\"; filename=\"" +
            safeName(file) + "\"\r\nContent-Type: " + file.getContentType() + "\r\n\r\n";
        body.write(headers.getBytes(StandardCharsets.UTF_8));
        body.write(file.getBytes());
        body.write(("\r\n--" + boundary + "--\r\n").getBytes(StandardCharsets.UTF_8));
        return body.toByteArray();
    }

    private String apiKey() throws Exception {
        try {
            String encoded = uploadThingToken.startsWith("ey") ? uploadThingToken : uploadThingToken.substring(uploadThingToken.indexOf('.') + 1);
            JsonNode token = objectMapper.readTree(new String(Base64.getUrlDecoder().decode(encoded), StandardCharsets.UTF_8));
            String apiKey = token.path("apiKey").asText();
            if (!apiKey.isBlank()) return apiKey;
        } catch (Exception ignored) {}
        throw new IllegalStateException("The configured UPLOADTHING_TOKEN is not a valid V7 token.");
    }

    private static String safeName(MultipartFile file) {
        String name = file.getOriginalFilename() != null ? file.getOriginalFilename() : "estate-image";
        return name.replaceAll("[^a-zA-Z0-9._-]", "-");
    }

    public record PrepareUpload(String fileType, String fileName, long fileSize, String acl) {}
    public record UploadedImages(List<String> urls) {}
    public record UploadError(String message) {}
}
