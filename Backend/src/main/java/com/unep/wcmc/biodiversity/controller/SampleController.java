package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.SampleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/samples")
public class SampleController {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private SampleService service;

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Sample> findAllSampleByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {

        return service.findAllByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }
}
