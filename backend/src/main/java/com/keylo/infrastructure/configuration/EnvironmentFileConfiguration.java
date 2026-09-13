package com.keylo.infrastructure.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EnvironmentFileConfiguration implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Map<String, Object> envProperties = new HashMap<>();

        List<Path> possibleEnvPaths = List.of(
            Path.of(".env"),
            Path.of("backend", ".env"),
            Path.of("..", ".env")
        );

        for (Path path : possibleEnvPaths) {
            File envFile = path.toFile();
            if (envFile.exists() && envFile.isFile()) {
                try {
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        String trimmed = line.trim();
                        if (trimmed.isEmpty() || trimmed.startsWith("#")) continue;
                        int equalsIdx = trimmed.indexOf('=');
                        if (equalsIdx > 0) {
                            String key = trimmed.substring(0, equalsIdx).trim();
                            String value = trimmed.substring(equalsIdx + 1).trim();
                            if ((value.startsWith("\"") && value.endsWith("\"")) ||
                                (value.startsWith("'") && value.endsWith("'"))) {
                                value = value.substring(1, value.length() - 1);
                            }
                            envProperties.putIfAbsent(key, value);
                        }
                    }
                } catch (IOException ignored) {}
            }
        }

        if (!envProperties.isEmpty()) {
            environment.getPropertySources().addFirst(new MapPropertySource("dotenvProperties", envProperties));
        }
    }
}
