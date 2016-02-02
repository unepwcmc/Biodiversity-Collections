package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.InstitutionSummary;
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

    @Query(value = "SELECT NEW com.unep.wcmc.biodiversity.model.InstitutionSummary(i.id, i.name, i.contact.address1, " +
            "i.contact.address2, i.contact.address3, i.contact.city, i.contact.district, i.contact.country, i.institutionType, " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id), " +
            "(SELECT COUNT(s.count) FROM BiodiversityCollection b JOIN b.specimens s WHERE b.institution.id = i.id), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FAUNA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FLORA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'MICROORGANISMS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'OTHERS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FUNGI')) " +
            "FROM Institution i ")
    List<InstitutionSummary> listInstitutionSummary();

    @Query(value = "SELECT NEW com.unep.wcmc.biodiversity.model.InstitutionSummary(i.id, i.name, i.contact.address1, " +
            "i.contact.address2, i.contact.address3, i.contact.city, i.contact.district, i.contact.country, i.institutionType, " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id), " +
            "(SELECT COUNT(s.count) FROM BiodiversityCollection b JOIN b.specimens s WHERE b.institution.id = i.id), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FAUNA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FLORA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'MICROORGANISMS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'OTHERS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b WHERE b.institution.id = i.id AND b.collectionDefinition = 'FUNGI')) " +
            "FROM Institution i ", countQuery = "SELECT COUNT(i.id) FROM Institution i")
    Page<InstitutionSummary> pageInstitutionSummary(Pageable pageable);

    @Query(value = "SELECT NEW com.unep.wcmc.biodiversity.model.InstitutionSummary(COUNT(i.id), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i), " +
            "(SELECT COUNT(s.count) FROM BiodiversityCollection b JOIN b.institution i JOIN b.specimens s), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i WHERE b.collectionDefinition = 'FAUNA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i WHERE b.collectionDefinition = 'FLORA'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i WHERE b.collectionDefinition = 'MICROORGANISMS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i WHERE b.collectionDefinition = 'OTHERS'), " +
            "(SELECT COUNT(b.id) FROM BiodiversityCollection b JOIN b.institution i WHERE b.collectionDefinition = 'FUNGI')) " +
            "FROM Institution i ")
    InstitutionSummary getInstitutionSummaryTotal();

    @Query(value = "select i.institution_type as type, count(*) as total from institution i group by i.institution_type", nativeQuery = true)
    List<Object[]> countByInstitutionType();

    @Query(value = "select i.name, i.id, count(b.id), count(s.collection_id) as total from institution i " +
            "left outer join biodiversity_collection b on b.institution_id = i.id " +
            "left outer join specimen s on s.collection_id = b.id " +
            "group by i.name, i.id", nativeQuery = true)
    List<Object[]> countByCollections();

    @Query(value = "select i.name, i.id, count(s.collection_id) as total, count(b.id) from institution i " +
            "left outer join biodiversity_collection b on b.institution_id = i.id " +
            "left outer join specimen s on s.collection_id = b.id " +
            "group by i.name, i.id", nativeQuery = true)
    List<Object[]> countBySpecimens();

}
