package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.service.InstitutionService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/institutions")
public class InstitutionController extends AbstractController<Institution, InstitutionService> {

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<Institution> name(@RequestParam String name,
                                  @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocompleteName")
    public List<Institution> autocomplete(@RequestParam String name) {
        return service.getRepository().findTop5ByNameContainingOrderByNameAsc(name);
    }

}