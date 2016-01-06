package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface InstitutionRepository extends AbstractRepository<Institution> {

    @EntityGraph(value = "Institution.detail", type = EntityGraph.EntityGraphType.LOAD)
    Institution getById(Long id);

    Page<Institution> findTop5ByDescriptionContainingIgnoreCaseOrderByDescriptionAsc(@Param("name") String name, Pageable p);

    Page<Institution> findByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable page);

    List<Institution> findTop5ByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name);

    Page<BiodiversityCollection> findAllByCollectionsIn(Collection<BiodiversityCollection> collection, Pageable page);

}
