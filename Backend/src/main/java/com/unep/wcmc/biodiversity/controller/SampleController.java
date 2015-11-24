package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.service.SampleService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/samples")
public class SampleController extends AbstractController<Sample, SampleService> {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private ImageService imageService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Sample> findAllSampleByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.findAllByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Sample uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Sample sample = service.get(id);
        if (!file.isEmpty())
            sample.setImage(imageService.save(file));
        return service.save(sample);
    }
}
