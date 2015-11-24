package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;
import java.util.List;

@RepositoryRestResource(path = "networks")
public interface NetworkRepository extends AbstractRepository<Network> {

    Page<Network> findAllByCollectionsIn( Collection<BiodiversityCollection> collection, Pageable page);

    @RestResource(path = "name")
    Page<Network> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);

    @RestResource(path = "autocomplete")
    List<Network> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);
}
