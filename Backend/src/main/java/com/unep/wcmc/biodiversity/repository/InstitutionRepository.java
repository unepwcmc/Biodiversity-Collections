package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
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

    @Query(value = "select i.id, i.name, i.address, i.address1, i.address2, i.address3, i.city, i.district, i.country, i.institution_type, " +
                        "count(b.id) as collection, count(s.id) as specimen, count(fauna.id) as fauna, count(flora.id) as flora, " +
                        "count(micro.id) as micro, count(others.id) as others, count(fungi.id) as fungi " +
                    "from institution i " +
                    "left outer join biodiversity_collection b on b.institution_id = i.id " +
                    "left outer join biodiversity_collection fauna on fauna.institution_id = i.id and fauna.collection_definition = 'FAUNA' " +
                    "left outer join biodiversity_collection flora on flora.institution_id = i.id and flora.collection_definition = 'FLORA' " +
                    "left outer join biodiversity_collection micro on micro.institution_id = i.id and micro.collection_definition = 'MICROORGANISMS' " +
                    "left outer join biodiversity_collection others on others.institution_id = i.id and others.collection_definition = 'OTHERS' " +
                    "left outer join biodiversity_collection fungi on fungi.institution_id = i.id and fungi.collection_definition = 'FUNGI' " +
                    "left outer join specimen s on s.collection_id = b.id " +
                    "group by i.id, i.name, i.address, i.address1, i.address2, i.address3, i.city, i.district, i.country, i.institution_type", nativeQuery = true)
    List<Object[]> listInstitutionSummary();

    @Query(value = "select i.institution_type as type, count(*) as total from institution i group by i.institution_type", nativeQuery = true)
    List<Object[]> countByInstitutionType();

}
