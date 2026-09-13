package com.shoply.infrastructure.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/** Allows local root .env values to be read during Spring Boot development. */
@Configuration
@PropertySource(value = "file:../.env", ignoreResourceNotFound = true)
public class EnvironmentFileConfiguration {
}
