package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/collections")
public class BiodiversityCollectionController extends AbstractController<BiodiversityCollection, BiodiversityCollectionService> {

    @Autowired
    private ImageService imageService;

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public BiodiversityCollection uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        BiodiversityCollection biodiversityCollection = service.get(id);
        if (!file.isEmpty())
            biodiversityCollection.setImage(imageService.save(file));
        return service.save(biodiversityCollection);
    }
}
