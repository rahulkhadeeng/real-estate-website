package com.keylo.application.service;

import com.keylo.application.dto.AuthTokenDto;
import com.keylo.application.dto.UserProfileDto;
import com.keylo.application.port.PasswordHasher;
import com.keylo.application.port.TokenIssuer;
import com.keylo.domain.model.User;
import com.keylo.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final TokenIssuer tokenIssuer;

    @Value("${keylo.admin-emails:admin@keylorealty.com,admin@keylo.com}")
    private String adminEmails;

    public AuthService(
        UserRepository userRepository,
        PasswordHasher passwordHasher,
        TokenIssuer tokenIssuer
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenIssuer = tokenIssuer;
    }

    public AuthTokenDto register(String email, String password, String name) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("An account with this email is already registered");
        }

        String role = "CLIENT";
        if (adminEmails != null && !adminEmails.isBlank()) {
            for (String adminEmail : adminEmails.split(",")) {
                if (adminEmail.trim().equalsIgnoreCase(normalizedEmail)) {
                    role = "ADMIN";
                    break;
                }
            }
        }

        String resolvedName = (name != null && !name.isBlank()) ? name.trim() : normalizedEmail.split("@")[0];
        String passwordHash = passwordHasher.hash(password);

        User savedUser = userRepository.save(new User(
            UUID.randomUUID(),
            normalizedEmail,
            passwordHash,
            resolvedName,
            role
        ));

        return toAuthTokenDto(savedUser);
    }

    public AuthTokenDto login(String email, String password) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        
        User user = userRepository.findByEmail(normalizedEmail)
            .orElseThrow(() -> new NoSuchElementException("Invalid email or password"));

        if (!passwordHasher.matches(password, user.passwordHash())) {
            throw new NoSuchElementException("Invalid email or password");
        }

        return toAuthTokenDto(user);
    }

    public UserProfileDto getProfile(String userIdStr) {
        UUID userId = UUID.fromString(userIdStr);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new NoSuchElementException("User not found"));
        return new UserProfileDto(user.id(), user.email(), user.name(), user.role());
    }

    private AuthTokenDto toAuthTokenDto(User user) {
        String token = tokenIssuer.issue(user);
        return new AuthTokenDto(
            token,
            user.id(),
            user.email(),
            user.name(),
            user.role()
        );
    }
}
