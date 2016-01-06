package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Attachment;
import com.unep.wcmc.biodiversity.model.Document;
import com.unep.wcmc.biodiversity.service.AttachmentService;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.DocumentService;
import com.unep.wcmc.biodiversity.service.SampleService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentController extends AbstractController<Document, DocumentService> {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private SampleService sampleService;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private HttpServletResponse response;

    @RequestMapping(method= RequestMethod.GET, value="/search")
    public Page<Document> search(@RequestParam String term,
                                 @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findAllByTitleContainingIgnoreCaseOrderByTitleAsc(term, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public List<Document> autocomplete(@RequestParam String term) {
        return service.getRepository().findTop5ByNameContainingIgnoreCaseOrderByNameAsc(term);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Document> getByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findAllByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/sample/{sampleId}")
    public Page<Document> getBySample(@PathVariable Long sampleId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findAllBySample(sampleService.get(sampleId), pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Document uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        Document document = service.get(id);
                 document.setMimeType(file.getContentType());

        if (!file.isEmpty()){

            try {
                document.setAttachment(new Attachment(file.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return service.save(document);
    }

    @ResponseBody
    @RequestMapping(value = "{id}/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public void download( @PathVariable Long id ) {

        Document document = service.get(id);
        byte[] file = attachmentService.get(document.getAttachment().getId()).getFile();
        String filename = document.getTitle() + "." + document.getContentType();

        response.setContentType(document.getMimeType());
        response.setHeader("Content-Disposition", "attachment;filename=" + filename);

        try {
            response.getOutputStream().write(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
