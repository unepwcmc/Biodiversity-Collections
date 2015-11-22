package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.CuratorService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.service.InstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;

@RestController
@RequestMapping("/collections")
public class BiodiversityCollectionController {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private CuratorService curatorService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private InstitutionService institutionService;

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public BiodiversityCollection uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

        BiodiversityCollection biodiversityCollection = biodiversityCollectionService.get(id);

        if (!file.isEmpty())
            biodiversityCollection.setImage(imageService.save(file));


        return biodiversityCollection;
    }

    @RequestMapping(method= RequestMethod.GET, value="/{name}/curators")
    public Page<Curator> findByCuratorNameStartsWith(@PathVariable String name, @PageableDefault(page = 0, size = 4) Pageable pageable){
        return curatorService.findByNameStartsWith(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/{name}/institutions")
    public Page<Institution> findByInstitutionNameStartsWith(@PathVariable String name, @PageableDefault(page = 0, size = 4) Pageable pageable){
        return institutionService.findByDescriptionStartsWith(name, pageable);
    }
}
