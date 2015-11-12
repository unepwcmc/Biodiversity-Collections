package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}