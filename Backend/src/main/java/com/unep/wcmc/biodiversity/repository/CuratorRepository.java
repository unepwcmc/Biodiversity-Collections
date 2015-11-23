package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "curators")
public interface CuratorRepository extends AbstractRepository<Curator> {

    @RestResource(path = "findName", rel = "findName")
    Page<Curator> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name, Pageable p);

}
