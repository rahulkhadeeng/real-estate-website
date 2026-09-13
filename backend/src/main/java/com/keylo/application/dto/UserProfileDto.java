package com.keylo.application.dto;

import java.util.UUID;

public record UserProfileDto(
    UUID id,
    String email,
    String name,
    String role
) {}
