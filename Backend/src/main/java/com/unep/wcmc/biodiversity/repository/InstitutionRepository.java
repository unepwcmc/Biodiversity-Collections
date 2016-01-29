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

    @Query(value = "SELECT i.id, i.name, i.address, i.address1, i.address2, i.address3, i.city, i.district, i.country, i.institution_type, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id) AS collection, " +
            "(SELECT COUNT(*) FROM specimen s JOIN biodiversity_collection b ON b.id = s.collection_id WHERE b.institution_id = i.id) AS specimen, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id AND b.collection_definition = 'FAUNA') AS fauna, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id AND b.collection_definition = 'FLORA') AS flora, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id AND b.collection_definition = 'MICROORGANISMS') AS micro, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id AND b.collection_definition = 'OTHERS') AS others, " +
            "(SELECT COUNT(*) FROM biodiversity_collection b WHERE b.institution_id = i.id AND b.collection_definition = 'FUNGI') AS fungi " +
            "FROM institution i ", nativeQuery = true)
    List<Object[]> listInstitutionSummary();

    @Query(value = "select i.institution_type as type, count(*) as total from institution i group by i.institution_type", nativeQuery = true)
    List<Object[]> countByInstitutionType();

    @Query(value = "select i.name, i.id, count(b.id) as total from institution i left outer join biodiversity_collection b on b.institution_id = i.id group by i.name, i.id", nativeQuery = true)
    List<Object[]> countByCollections();

    @Query(value = "select i.name, i.id, count(s.id) as total from institution i " +
            "left outer join biodiversity_collection b on b.institution_id = i.id " +
            "left outer join specimen s on s.collection_id = b.id " +
            "group by i.name, i.id", nativeQuery = true)
    List<Object[]> countBySpecimens();

}
