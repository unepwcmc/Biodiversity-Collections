package com.unep.wcmc.biodiversity.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.rest.core.annotation.RestResource;

@NoRepositoryBean
public interface AbstractRepository<E extends BaseEntity> extends JpaRepository<E, Long> {

    @Override @RestResource(exported = false)
    <S extends E> S save(S entity);

    @Override @RestResource(exported = false)
    void delete(Long id);

    @Override @RestResource(exported = false)
    void delete(E entity);
}