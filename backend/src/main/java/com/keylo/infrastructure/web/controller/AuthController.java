package com.keylo.infrastructure.web.controller;

import com.keylo.application.dto.AuthTokenDto;
import com.keylo.application.dto.UserProfileDto;
import com.keylo.application.service.AuthService;
import com.keylo.infrastructure.web.request.LoginRequest;
import com.keylo.infrastructure.web.request.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthTokenDto> register(@Valid @RequestBody RegisterRequest request) {
        AuthTokenDto tokenDto = authService.register(
            request.email(),
            request.password(),
            request.name()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(tokenDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthTokenDto> login(@Valid @RequestBody LoginRequest request) {
        AuthTokenDto tokenDto = authService.login(request.email(), request.password());
        return ResponseEntity.ok(tokenDto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getCurrentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserProfileDto profile = authService.getProfile(authentication.getName());
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Keylo Realty Auth API",
            "timestamp", String.valueOf(System.currentTimeMillis())
        ));
    }
}
