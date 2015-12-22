package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface BiodiversityCollectionRepository extends AbstractRepository<BiodiversityCollection> {

    @EntityGraph(value = "BiodiversityCollection.detail", type = EntityGraph.EntityGraphType.LOAD)
    BiodiversityCollection loadGraph(Long id);

    Page<BiodiversityCollection> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);

    List<BiodiversityCollection> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);

    Page<BiodiversityCollection> findByInstitutionIdOrderByNameAsc(@Param("id") Long id, Pageable page);

    Page<BiodiversityCollection> findByNetworksIdOrderByNameAsc(@Param("id") Long id, Pageable page);

    Page<BiodiversityCollection> findByNameContainingAndInstitutionNotInOrInstitutionIsNullOrderByNameAsc(String name, Institution institution, Pageable page);

    Page<BiodiversityCollection> findByNameContainingAndNetworksNotInOrNetworksIsNullOrderByNameAsc(String name, Collection<Network> networks, Pageable page);
}
