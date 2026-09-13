package com.shoply.infrastructure.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import javax.sql.DataSource;
import java.net.URI;

/**
 * Customizes and instantiates the primary DataSource bean.
 * Prioritizes SPRING_DATASOURCE_URL first, then auto-parses DATABASE_URL (standard for Render Postgres links),
 * and finally falls back to application.yml values.
 */
@Configuration
public class DatabaseUrlResolver {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlResolver.class);

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties properties) {
        String springDatasourceUrl = System.getenv("SPRING_DATASOURCE_URL");
        String databaseUrl = System.getenv("DATABASE_URL");

        if (springDatasourceUrl != null && !springDatasourceUrl.isEmpty()) {
            log.info("SPRING_DATASOURCE_URL found in environment. Using configured URL.");
            properties.setUrl(springDatasourceUrl);
        } else if (databaseUrl != null && !databaseUrl.isEmpty()) {
            log.info("DATABASE_URL found in environment. Attempting to parse and convert postgres:// URL to JDBC format.");
            try {
                if (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://")) {
                    URI uri = new URI(databaseUrl);
                    String userInfo = uri.getUserInfo();
                    if (userInfo != null && userInfo.contains(":")) {
                        String[] parts = userInfo.split(":", 2);
                        properties.setUsername(parts[0]);
                        properties.setPassword(parts[1]);
                    }

                    String host = uri.getHost();
                    int port = uri.getPort();
                    if (port == -1) {
                        port = 5432;
                    }
                    String path = uri.getPath();

                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                    String query = uri.getQuery();
                    if (query != null) {
                        jdbcUrl += "?" + query;
                    } else {
                        jdbcUrl += "?sslmode=require";
                    }
                    properties.setUrl(jdbcUrl);
                } else {
                    properties.setUrl(databaseUrl);
                }
            } catch (Exception e) {
                log.error("Failed parsing DATABASE_URL. Falling back to simple replacement.", e);
                // Fallback to simple replace
                if (databaseUrl.startsWith("postgres://")) {
                    properties.setUrl(databaseUrl.replace("postgres://", "jdbc:postgresql://"));
                } else if (databaseUrl.startsWith("postgresql://")) {
                    properties.setUrl(databaseUrl.replace("postgresql://", "jdbc:postgresql://"));
                } else {
                    properties.setUrl(databaseUrl);
                }
            }
        } else {
            log.warn("Neither SPRING_DATASOURCE_URL nor DATABASE_URL found in environment. Falling back to default properties.");
        }

        String maskedUrl = maskUrl(properties.getUrl());
        log.info("Initializing Hikari DataSource for database URL: {}", maskedUrl);

        return DataSourceBuilder.create()
                .driverClassName(properties.determineDriverClassName())
                .url(properties.getUrl())
                .username(properties.getUsername())
                .password(properties.getPassword())
                .build();
    }

    private String maskUrl(String url) {
        if (url == null) return null;
        // Mask credentials in form of "user:pass@host"
        return url.replaceAll("(?<=://)[^/]+:[^/]+@", "****:****@");
    }
}
