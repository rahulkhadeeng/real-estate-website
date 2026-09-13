package com.keylo.infrastructure.persistence.repository;

import com.keylo.infrastructure.persistence.entity.AmenityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpringDataAmenityRepository extends JpaRepository<AmenityEntity, Long> {
}
