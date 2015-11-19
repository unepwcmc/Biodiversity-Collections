package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Document;
import com.unep.wcmc.biodiversity.repository.DocumentRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DocumentService extends AbstractService<Document, DocumentRepository> {

    public Page<Document> findAllByCollection(BiodiversityCollection collection, Pageable page){
        return repo.findAllByCollection(collection, page);
    }
}
