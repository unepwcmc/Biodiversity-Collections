package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface NetworkRepository extends AbstractRepository<Network> {

    Page<Network> findByCollectionsInOrderByNameAsc( Collection<BiodiversityCollection> collection, Pageable page);

    Page<Network> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);

    List<Network> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);

    Page<Network> findByInstitutionsInOrderByNameAsc( Collection<Institution> institutions, Pageable page);

    Page<Network> findByNameContainingAndCollectionsNotInOrCollectionsIsNullOrderByNameAsc(String name, Collection<BiodiversityCollection> collection, Pageable page);

    Page<Network> findByNameContainingAndInstitutionsNotInOrInstitutionsIsNullOrderByNameAsc(String name, Collection<Institution> institutions, Pageable page);
}
