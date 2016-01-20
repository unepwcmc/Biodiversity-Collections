package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface NetworkRepository extends AbstractRepository<Network> {

    Page<Network> findByCollectionsInOrderByNameAsc( Collection<BiodiversityCollection> collection, Pageable page);

    Page<Network> findByNameContainingOrderByNameAsc(@Param("name") String name, Pageable page);

    List<Network> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);

    Page<Network> findByInstitutionsInOrderByNameAsc( Collection<Institution> institutions, Pageable page);

    @Query("select distinct n from Network n left join n.collections c where n.name like concat('%',:name,'%') and (c not in :collection or c is null) order by n.name")
    Page<Network> findByCollectionsNotIn(@Param("name") String name, @Param("collection") Collection<BiodiversityCollection> collection, Pageable page);

    @Query("select distinct n from Network n left join n.institutions i where n.name like concat('%',:name,'%') and (i not in :institutions or i is null) order by n.name")
    Page<Network> findByInstitutionsNotIn(@Param("name") String name, @Param("institutions") Collection<Institution> institutions, Pageable page);
}
