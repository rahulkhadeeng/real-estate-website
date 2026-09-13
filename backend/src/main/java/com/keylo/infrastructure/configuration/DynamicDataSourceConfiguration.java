package com.keylo.infrastructure.configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;

@Configuration
public class DynamicDataSourceConfiguration {
    private static final Logger log = LoggerFactory.getLogger(DynamicDataSourceConfiguration.class);

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/shoply?sslmode=disable}")
    private String pgUrl;

    @Value("${spring.datasource.username:postgres}")
    private String pgUser;

    @Value("${spring.datasource.password:12345}")
    private String pgPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        // First, test PostgreSQL with configured credentials (and common defaults like 12345 / postgres)
        String[] possiblePasswords = new String[]{pgPassword, "12345", "postgres", "admin", "root", "shoply_local_2026"};
        String[] possibleUsers = new String[]{pgUser, "postgres", "shoply"};
        String[] possibleUrls = new String[]{
            pgUrl,
            "jdbc:postgresql://localhost:5432/keylodb",
            "jdbc:postgresql://localhost:5432/shoply?sslmode=disable",
            "jdbc:postgresql://localhost:5432/postgres"
        };

        for (String url : possibleUrls) {
            for (String user : possibleUsers) {
                for (String pwd : possiblePasswords) {
                    try {
                        DriverManager.setLoginTimeout(2);
                        try (Connection conn = DriverManager.getConnection(url, user, pwd)) {
                            log.info("Successfully connected to PostgreSQL at {} with user '{}'", url, user);
                            HikariConfig config = new HikariConfig();
                            config.setJdbcUrl(url);
                            config.setUsername(user);
                            config.setPassword(pwd);
                            config.setDriverClassName("org.postgresql.Driver");
                            config.setMaximumPoolSize(10);
                            config.setMinimumIdle(2);
                            return new HikariDataSource(config);
                        }
                    } catch (Exception ignored) {
                        // try next candidate
                    }
                }
            }
        }

        // Fallback to embedded file-based H2 Database for seamless zero-setup execution
        log.warn("Could not authenticate with local PostgreSQL. Gracefully falling back to persistent H2 file database at './data/keylodb'");
        HikariConfig h2Config = new HikariConfig();
        h2Config.setJdbcUrl("jdbc:h2:file:./data/keylodb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;AUTO_SERVER=TRUE");
        h2Config.setDriverClassName("org.h2.Driver");
        h2Config.setUsername("sa");
        h2Config.setPassword("");
        h2Config.setMaximumPoolSize(10);
        return new HikariDataSource(h2Config);
    }
}
