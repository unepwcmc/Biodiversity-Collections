package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "institutions")
public interface InstitutionRepository extends AbstractRepository<Institution> {

    @RestResource(path = "autocomplete", rel = "autocomplete")
    Page<Institution> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name, Pageable p);

    @RestResource(path = "name")
    Page<Institution> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);
}
