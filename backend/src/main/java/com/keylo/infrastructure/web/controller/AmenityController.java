package com.keylo.infrastructure.web.controller;

import com.keylo.infrastructure.persistence.entity.AmenityEntity;
import com.keylo.infrastructure.persistence.repository.SpringDataAmenityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/amenities")
public class AmenityController {
    private final SpringDataAmenityRepository amenityRepository;

    public AmenityController(SpringDataAmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @GetMapping
    public ResponseEntity<List<AmenityEntity>> getAllAmenities() {
        return ResponseEntity.ok(amenityRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AmenityEntity> getAmenity(@PathVariable Long id) {
        return amenityRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new NoSuchElementException("Amenity not found: " + id));
    }

    @PostMapping
    public ResponseEntity<AmenityEntity> createAmenity(@RequestBody AmenityEntity amenity) {
        if (amenity.getId() == null) {
            amenity.setId(System.currentTimeMillis());
        }
        AmenityEntity saved = amenityRepository.save(amenity);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmenityEntity> updateAmenity(@PathVariable Long id, @RequestBody AmenityEntity updated) {
        AmenityEntity existing = amenityRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Amenity not found with id: " + id));

        if (updated.getTitle() != null) existing.setTitle(updated.getTitle());
        if (updated.getBgImage() != null) existing.setBgImage(updated.getBgImage());
        if (updated.getIconName() != null) existing.setIconName(updated.getIconName());
        if (updated.getCategory() != null) existing.setCategory(updated.getCategory());
        if (updated.getIsFeatured() != null) existing.setIsFeatured(updated.getIsFeatured());

        return ResponseEntity.ok(amenityRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteAmenity(@PathVariable Long id) {
        AmenityEntity existing = amenityRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Amenity not found with id: " + id));
        amenityRepository.delete(existing);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }
}
