package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.service.CuratorService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/curators")
public class CuratorController extends AbstractController<Curator, CuratorService> {

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public Page<Curator> autocomplete(@RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findTop5ByNameContainingOrderByNameAsc(name, pageable);
    }

}