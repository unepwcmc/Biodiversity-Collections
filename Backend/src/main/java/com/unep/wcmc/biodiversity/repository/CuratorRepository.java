package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CuratorRepository extends AbstractRepository<Curator> {

    @EntityGraph(value = "Curator.detail", type = EntityGraph.EntityGraphType.LOAD)
    Curator getById(Long id);


    List<Curator> findTop5ByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable p);

    Page<Curator> findByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable p);

}
