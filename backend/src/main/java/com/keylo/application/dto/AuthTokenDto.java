package com.keylo.application.dto;

import java.util.UUID;

public record AuthTokenDto(
    String token,
    UUID userId,
    String email,
    String name,
    String role
) {}
