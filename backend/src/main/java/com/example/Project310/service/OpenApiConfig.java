package com.example.Project310.service;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
	OpenAPI booksDatabaseOpenAPI() {
		Info info = new Info();
		info.title("Books Rest API");
		info.description("Books Database");
		info.version("0.0.1");
		OpenAPI openApi = new OpenAPI();
		openApi.info(info);
		return openApi;

	}
}
