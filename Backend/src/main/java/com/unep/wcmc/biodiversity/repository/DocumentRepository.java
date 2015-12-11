package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Document;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends AbstractRepository<Document> {

    Page<Document> findAllByCollection(BiodiversityCollection collection, Pageable p);

    Page<Document> findAllBySample(Sample sample, Pageable p);

    List<Document> findTop5ByNameContainingOrderByNameAsc(@Param("name") String name);

    Page<Document> findAllByNameContainingOrderByNameAsc(String name, Pageable p);
}