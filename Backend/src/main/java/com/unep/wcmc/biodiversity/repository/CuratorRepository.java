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

    Curator findByUserEmail(String email);

    List<Curator> findTop5ByUserFirstNameContainingIgnoreCaseOrderByUserFirstNameAsc(@Param("firstName") String name, Pageable p);

    Page<Curator> findByUserFirstNameContainingIgnoreCaseOrderByUserFirstNameAsc(@Param("firstName") String name, Pageable p);

}
