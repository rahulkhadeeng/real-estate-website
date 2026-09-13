package com.keylo.infrastructure.web.controller;

import com.keylo.infrastructure.persistence.entity.ProjectEntity;
import com.keylo.infrastructure.persistence.repository.SpringDataProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final SpringDataProjectRepository projectRepository;

    public ProjectController(SpringDataProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<ProjectEntity>> getAllProjects() {
        return ResponseEntity.ok(projectRepository.findAll());
    }

    @GetMapping("/{idOrSlug}")
    public ResponseEntity<ProjectEntity> getProject(@PathVariable String idOrSlug) {
        return projectRepository.findById(idOrSlug)
            .or(() -> projectRepository.findBySlug(idOrSlug))
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new NoSuchElementException("Project not found: " + idOrSlug));
    }

    @PostMapping
    public ResponseEntity<ProjectEntity> createProject(@RequestBody ProjectEntity project) {
        if (project.getId() == null || project.getId().isBlank()) {
            String generatedId = project.getTitle() != null
                ? project.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-")
                : "proj-" + System.currentTimeMillis();
            project.setId(generatedId);
        }
        if (project.getSlug() == null || project.getSlug().isBlank()) {
            project.setSlug(project.getId());
        }
        ProjectEntity saved = projectRepository.save(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectEntity> updateProject(@PathVariable String id, @RequestBody ProjectEntity updated) {
        ProjectEntity existing = projectRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + id));

        if (updated.getTitle() != null) existing.setTitle(updated.getTitle());
        if (updated.getSlug() != null) existing.setSlug(updated.getSlug());
        if (updated.getDeveloper() != null) existing.setDeveloper(updated.getDeveloper());
        if (updated.getLocation() != null) existing.setLocation(updated.getLocation());
        if (updated.getSpec() != null) existing.setSpec(updated.getSpec());
        if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
        if (updated.getPrice() != null) existing.setPrice(updated.getPrice());
        if (updated.getBgImage() != null) existing.setBgImage(updated.getBgImage());
        if (updated.getBadge() != null) existing.setBadge(updated.getBadge());
        if (updated.getOverview() != null) existing.setOverview(updated.getOverview());
        if (updated.getConfigurationsJson() != null) existing.setConfigurationsJson(updated.getConfigurationsJson());
        if (updated.getHighlightsJson() != null) existing.setHighlightsJson(updated.getHighlightsJson());
        if (updated.getAmenitiesJson() != null) existing.setAmenitiesJson(updated.getAmenitiesJson());

        return ResponseEntity.ok(projectRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProject(@PathVariable String id) {
        ProjectEntity existing = projectRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + id));
        projectRepository.delete(existing);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }
}
