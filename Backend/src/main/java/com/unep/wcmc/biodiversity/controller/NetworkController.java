package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.NetworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/networks")
public class NetworkController{

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private NetworkService service;

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Network> findAllNetworkByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.findAllNetworkByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }
}
