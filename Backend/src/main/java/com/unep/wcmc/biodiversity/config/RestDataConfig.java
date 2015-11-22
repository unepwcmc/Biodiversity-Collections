package com.unep.wcmc.biodiversity.config;

import com.unep.wcmc.biodiversity.model.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class RestDataConfig extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(BiodiversityCollection.class);
        config.exposeIdsFor(Curator.class);
        config.exposeIdsFor(Researcher.class);
        config.exposeIdsFor(Specimen.class);
        config.exposeIdsFor(Institution.class);
    }
}
