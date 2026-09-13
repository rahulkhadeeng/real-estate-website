package com.keylo.infrastructure.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.keylo.application.port.TokenIssuer;
import com.keylo.domain.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtTokenService implements TokenIssuer {
    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final long hours;

    public JwtTokenService(
        @Value("${keylo.jwt.secret}") String secret,
        @Value("${keylo.jwt.expiration-hours:72}") long hours
    ) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.verifier = JWT.require(this.algorithm).build();
        this.hours = hours;
    }

    @Override
    public String issue(User user) {
        return JWT.create()
            .withSubject(user.id().toString())
            .withClaim("email", user.email())
            .withClaim("name", user.name() != null ? user.name() : "")
            .withClaim("role", user.role())
            .withIssuedAt(new Date())
            .withExpiresAt(Date.from(Instant.now().plus(hours, ChronoUnit.HOURS)))
            .sign(algorithm);
    }

    @Override
    public DecodedJWT verify(String token) {
        return verifier.verify(token);
    }
}
