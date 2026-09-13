package com.keylo.infrastructure.persistence;

import com.keylo.domain.model.User;
import com.keylo.domain.repository.UserRepository;
import com.keylo.infrastructure.persistence.entity.UserEntity;
import com.keylo.infrastructure.persistence.repository.SpringDataUserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class UserPersistenceAdapter implements UserRepository {
    private final SpringDataUserRepository springUsers;

    public UserPersistenceAdapter(SpringDataUserRepository springUsers) {
        this.springUsers = springUsers;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return springUsers.findByEmail(email).map(this::toDomain);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return springUsers.findById(id).map(this::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = new UserEntity(
            user.id(),
            user.email(),
            user.passwordHash(),
            user.name(),
            user.role()
        );
        return toDomain(springUsers.save(entity));
    }

    @Override
    public boolean existsByEmail(String email) {
        return springUsers.existsByEmail(email);
    }

    private User toDomain(UserEntity entity) {
        return new User(
            entity.getId(),
            entity.getEmail(),
            entity.getPasswordHash(),
            entity.getName(),
            entity.getRole()
        );
    }
}
