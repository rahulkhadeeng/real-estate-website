package com.keylo.infrastructure.persistence.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "projects")
public class ProjectEntity {
    @Id
    @Column(name = "id", nullable = false, length = 100)
    private String id;

    @Column(name = "slug", nullable = false, unique = true, length = 120)
    private String slug;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "developer", length = 150)
    private String developer;

    @Column(name = "location", length = 250)
    private String location;

    @Column(name = "spec", length = 250)
    private String spec;

    @Column(name = "status", length = 100)
    private String status;

    @Column(name = "price", length = 100)
    private String price;

    @Column(name = "bg_image", length = 1000)
    private String bgImage;

    @Column(name = "badge", length = 80)
    private String badge;

    @Column(name = "overview", columnDefinition = "TEXT")
    private String overview;

    @Column(name = "configurations_json", columnDefinition = "TEXT")
    private String configurationsJson;

    @Column(name = "highlights_json", columnDefinition = "TEXT")
    private String highlightsJson;

    @Column(name = "amenities_json", columnDefinition = "TEXT")
    private String amenitiesJson;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public ProjectEntity() {}

    public ProjectEntity(
        String id,
        String slug,
        String title,
        String developer,
        String location,
        String spec,
        String status,
        String price,
        String bgImage,
        String badge,
        String overview,
        String configurationsJson,
        String highlightsJson,
        String amenitiesJson
    ) {
        this.id = id;
        this.slug = slug != null ? slug : (title != null ? title.toLowerCase().replaceAll("[^a-z0-9]+", "-") : id);
        this.title = title;
        this.developer = developer;
        this.location = location;
        this.spec = spec;
        this.status = status;
        this.price = price;
        this.bgImage = bgImage;
        this.badge = badge;
        this.overview = overview;
        this.configurationsJson = configurationsJson;
        this.highlightsJson = highlightsJson;
        this.amenitiesJson = amenitiesJson;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = Instant.now();
        }
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDeveloper() { return developer; }
    public void setDeveloper(String developer) { this.developer = developer; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSpec() { return spec; }
    public void setSpec(String spec) { this.spec = spec; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getBgImage() { return bgImage; }
    public void setBgImage(String bgImage) { this.bgImage = bgImage; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getConfigurationsJson() { return configurationsJson; }
    public void setConfigurationsJson(String configurationsJson) { this.configurationsJson = configurationsJson; }

    public String getHighlightsJson() { return highlightsJson; }
    public void setHighlightsJson(String highlightsJson) { this.highlightsJson = highlightsJson; }

    public String getAmenitiesJson() { return amenitiesJson; }
    public void setAmenitiesJson(String amenitiesJson) { this.amenitiesJson = amenitiesJson; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
