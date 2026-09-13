package com.keylo.infrastructure.web.controller;

import com.keylo.infrastructure.persistence.entity.TestimonialEntity;
import com.keylo.infrastructure.persistence.repository.SpringDataTestimonialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {
    private final SpringDataTestimonialRepository testimonialRepository;

    public TestimonialController(SpringDataTestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialEntity>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialEntity> getTestimonial(@PathVariable Long id) {
        return testimonialRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new NoSuchElementException("Testimonial not found: " + id));
    }

    @PostMapping
    public ResponseEntity<TestimonialEntity> createTestimonial(@RequestBody TestimonialEntity testimonial) {
        if (testimonial.getId() == null) {
            testimonial.setId(System.currentTimeMillis());
        }
        TestimonialEntity saved = testimonialRepository.save(testimonial);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialEntity> updateTestimonial(@PathVariable Long id, @RequestBody TestimonialEntity updated) {
        TestimonialEntity existing = testimonialRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Testimonial not found with id: " + id));

        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getRole() != null) existing.setRole(updated.getRole());
        if (updated.getUnit() != null) existing.setUnit(updated.getUnit());
        if (updated.getAvatar() != null) existing.setAvatar(updated.getAvatar());
        if (updated.getRating() != null) existing.setRating(updated.getRating());
        if (updated.getQuote() != null) existing.setQuote(updated.getQuote());

        return ResponseEntity.ok(testimonialRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTestimonial(@PathVariable Long id) {
        TestimonialEntity existing = testimonialRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Testimonial not found with id: " + id));
        testimonialRepository.delete(existing);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }
}
