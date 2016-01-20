package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.CollectionDefinition;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface BiodiversityCollectionRepository extends AbstractRepository<BiodiversityCollection> {

    @EntityGraph(value = "BiodiversityCollection.detail", type = EntityGraph.EntityGraphType.LOAD)
    BiodiversityCollection getById(Long id);

    Page<BiodiversityCollection> findByNameContainingIgnoreCaseAndPublishedOrderByNameAsc(@Param("name") String name, @Param("published") Boolean published, Pageable page);

    @Query("select c from BiodiversityCollection c where upper(c.name) like concat('%',:name,'%') and (c.published = true or (c.published = false and c.curator.user.id = :curatorId))")
    Page<BiodiversityCollection> findByNameContainingIgnoreCaseOrderByNameAscForCurator(@Param("name") String name, @Param("curatorId") Long curatorId, Pageable page);

    Page<BiodiversityCollection> findByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable page);

    List<BiodiversityCollection> findTop5ByNameContainingIgnoreCaseAndPublishedOrderByNameAsc(@Param("name") String name, @Param("published") Boolean published);

    @Query("select c from BiodiversityCollection c where upper(c.name) like concat('%',:name,'%') and (c.published = true or (c.published = false and c.curator.user.id = :curatorId))")
    List<BiodiversityCollection> findTop5ByNameContainingIgnoreCaseOrderByNameAscForCurator(@Param("name") String name, @Param("curatorId") Long curatorId, Pageable pageable);

    List<BiodiversityCollection> findTop5ByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name);

    Page<BiodiversityCollection> findAllByPublished(@Param("published") Boolean published, Pageable pageable);

    @Query("select c from BiodiversityCollection c where (c.published = true or (c.published = false and c.curator.user.id = :curatorId))")
    Page<BiodiversityCollection> findAllForCurator(@Param("curatorId") Long curatorId, Pageable pageable);

    Page<BiodiversityCollection> findAllByCollectionDefinitionAndPublished(@Param("collectionDefinition") CollectionDefinition collectionDefinition, @Param("published") Boolean published, Pageable pageable);

    @Query("select c from BiodiversityCollection c where c.collectionDefinition = :collectionDefinition and (c.published = true or (c.published = false and c.curator.user.id = :curatorId))")
    Page<BiodiversityCollection> findAllByCollectionDefinitionForCurator(@Param("collectionDefinition") CollectionDefinition collectionDefinition, @Param("curatorId") Long curatorId, Pageable pageable);

    Page<BiodiversityCollection> findAllByCollectionDefinition(@Param("collectionDefinition") CollectionDefinition collectionDefinition, Pageable pageable);

    Page<BiodiversityCollection> findByInstitutionIdOrderByNameAsc(@Param("id") Long id, Pageable page);

    Page<BiodiversityCollection> findByNetworksIdOrderByNameAsc(@Param("id") Long id, Pageable page);

    Page<BiodiversityCollection> findByNameContainingAndInstitutionNotInOrInstitutionIsNullOrderByNameAsc(String name, Institution institution, Pageable page);

    @Query("select distinct c from BiodiversityCollection c left join c.networks n where c.name like concat('%',:name,'%') and (n not in :networks or n is null) order by c.name")
    Page<BiodiversityCollection> findByNetworksNotIn(@Param("name") String name, @Param("networks") Collection<Network> networks, Pageable page);
}
