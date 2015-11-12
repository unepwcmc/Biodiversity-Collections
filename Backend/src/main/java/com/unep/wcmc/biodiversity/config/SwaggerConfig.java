package com.unep.wcmc.biodiversity.config;

import com.mangofactory.swagger.configuration.SpringSwaggerConfig;
import com.mangofactory.swagger.models.dto.ApiInfo;
import com.mangofactory.swagger.plugin.EnableSwagger;
import com.mangofactory.swagger.plugin.SwaggerSpringMvcPlugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ComponentScan
@EnableAutoConfiguration
@EnableSwagger
//@Profile({"qa", "dev"})
public class SwaggerConfig {

    @Autowired
    SpringSwaggerConfig springSwaggerConfig;

    /**
     * Swagger API documentation plugin
     * @return
     */
    @Bean
    public SwaggerSpringMvcPlugin customImplementation() {
        return new SwaggerSpringMvcPlugin(this.springSwaggerConfig)
                //Root level documentation
                .apiInfo(new ApiInfo(
                        "Biodiversity Collections Service JSON API",
                        "This service provides a JSON representation of the Biodiversity Collections API",
                        null, null, null, null))
                        // Map the specific URL patterns into Swagger
                .includePatterns("/collection.*");
    }

}