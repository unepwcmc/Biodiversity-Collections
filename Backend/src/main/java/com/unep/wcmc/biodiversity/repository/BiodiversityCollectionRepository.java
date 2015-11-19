package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "collections")
public interface BiodiversityCollectionRepository extends JpaRepository<BiodiversityCollection, Long> {

    @RestResource(path = "name")
    Page<BiodiversityCollection> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);

    @RestResource(path = "autocomplete")
    List<BiodiversityCollection> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);

}
