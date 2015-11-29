package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Attachment;
import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Document;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.DocumentService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/documents")
public class DocumentController extends AbstractController<Document, DocumentService> {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Document> findAllNetworkByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.findAllByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Document uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        Document document = service.get(id);

        if (!file.isEmpty()){

            try {
                document.setAttachment(new Attachment(file.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return service.save(document);
    }
}
