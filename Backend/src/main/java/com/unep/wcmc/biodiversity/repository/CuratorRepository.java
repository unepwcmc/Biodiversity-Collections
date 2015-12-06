package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface CuratorRepository extends AbstractRepository<Curator> {

    Page<Curator> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name, Pageable p);

    Page<Curator> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable p);

}
