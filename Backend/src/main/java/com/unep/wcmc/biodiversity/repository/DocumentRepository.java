package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Document;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DocumentRepository extends AbstractRepository<Document> {

    Page<Document> findByCollectionId(Long id, Pageable p);

    Page<Document> findBySampleId(Long id, Pageable p);

    List<Document> findTop5ByNameContainingIgnoreCaseOrderByNameAsc(@Param("name") String name);

    Page<Document> findAllByTitleContainingIgnoreCaseOrderByTitleAsc(String title, Pageable p);
}