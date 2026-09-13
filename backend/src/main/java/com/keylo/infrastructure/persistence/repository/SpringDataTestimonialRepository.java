package com.keylo.infrastructure.persistence.repository;

import com.keylo.infrastructure.persistence.entity.TestimonialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataTestimonialRepository extends JpaRepository<TestimonialEntity, Long> {
}
