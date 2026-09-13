package com.keylo.infrastructure.persistence.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "testimonials")
public class TestimonialEntity {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "role", length = 150)
    private String role;

    @Column(name = "unit", length = 200)
    private String unit;

    @Column(name = "avatar", length = 1000)
    private String avatar;

    @Column(name = "rating", nullable = false)
    private Integer rating = 5;

    @Column(name = "quote", columnDefinition = "TEXT", nullable = false)
    private String quote;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public TestimonialEntity() {}

    public TestimonialEntity(
        Long id,
        String name,
        String role,
        String unit,
        String avatar,
        Integer rating,
        String quote
    ) {
        this.id = id != null ? id : System.currentTimeMillis();
        this.name = name;
        this.role = role;
        this.unit = unit;
        this.avatar = avatar;
        this.rating = rating != null ? rating : 5;
        this.quote = quote;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.id == null) {
            this.id = System.currentTimeMillis();
        }
        if (this.createdAt == null) {
            this.createdAt = Instant.now();
        }
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
