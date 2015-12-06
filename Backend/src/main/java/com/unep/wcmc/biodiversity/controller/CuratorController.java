package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.service.CuratorService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/curators")
public class CuratorController extends AbstractController<Curator, CuratorService> {

    @Autowired
    private ImageService imageService;

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<Curator> name(@RequestParam String name,
                              @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public Page<Curator> autocomplete(@RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findTop5ByNameContainingOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Curator uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Curator curator = service.get(id);
        if (!file.isEmpty())
            curator.setImage(imageService.save(file));

        return service.save(curator);
    }

}