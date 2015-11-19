package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;


@RepositoryRestResource(path = "curators")
public interface CuratorRepository extends JpaRepository<Curator, Long> {

    @RestResource(path = "name", rel = "name")
    public Page findByNameStartsWith(@Param("name") String name, Pageable p);
}
