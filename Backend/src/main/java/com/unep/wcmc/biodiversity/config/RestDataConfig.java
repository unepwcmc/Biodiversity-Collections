package com.unep.wcmc.biodiversity.config;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.reflections.Reflections;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class RestDataConfig extends RepositoryRestConfigurerAdapter {

    protected static final Log logger = LogFactory.getLog(RestDataConfig.class);

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        List<Class> entityClasses = new ArrayList<>();
        Reflections reflections = new Reflections("com.unep.wcmc.biodiversity.model");
        Set<Class<? extends BaseEntity>> classes = reflections.getSubTypesOf(BaseEntity.class);
        for (Class<? extends BaseEntity> clazz : classes) {
            try {
                entityClasses.add(clazz);
            } catch (Exception e) {
                logger.error(e);
            }
        }
        config.exposeIdsFor(entityClasses.toArray(new Class[0]));
    }
}