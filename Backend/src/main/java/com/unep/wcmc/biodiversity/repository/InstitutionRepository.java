package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface InstitutionRepository extends AbstractRepository<Institution> {

    @RestResource(path = "name", rel = "name")
    public Page<Institution> findByDescriptionStartsWith(@Param("name") String name, Pageable p);
}
