package com.unep.wcmc.biodiversity.config;

import com.google.common.reflect.ClassPath;
import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
        try {
            Set<ClassPath.ClassInfo> classes =
                    ClassPath.from(this.getClass().getClassLoader()).getTopLevelClasses("com.unep.wcmc.biodiversity.model");
            List<Class> entityClasses = new ArrayList<>();
            for (ClassPath.ClassInfo classInfo : classes) {
                Class<?> clazz = classInfo.load();
                if (BaseEntity.class.isAssignableFrom(clazz)) {
                    entityClasses.add(clazz);
                }
            }
            config.exposeIdsFor(entityClasses.toArray(new Class[0]));
        } catch (Exception ex) {
            logger.error(ex);
        }
    }
}