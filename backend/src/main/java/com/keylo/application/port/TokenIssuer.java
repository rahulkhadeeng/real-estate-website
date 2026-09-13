package com.keylo.application.port;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.keylo.domain.model.User;

public interface TokenIssuer {
    String issue(User user);
    DecodedJWT verify(String token);
}
