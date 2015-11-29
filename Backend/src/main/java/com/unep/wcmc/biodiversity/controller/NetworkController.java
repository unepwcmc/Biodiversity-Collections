package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.service.NetworkService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/networks")
public class NetworkController extends AbstractController<Network, NetworkService> {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private ImageService imageService;

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Network> findAllNetworkByCollection(@PathVariable Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.findAllNetworkByCollection(biodiversityCollectionService.get(collectionId), pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/collection/{collectionId}/network/{name}")
    public Page<Network> findAllNetworkByNotInCollection(@PathVariable("name") String name, @PathVariable("collectionId") Long collectionId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.findNetworkByNameAndNotInCollection(name, biodiversityCollectionService.get(collectionId), pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Network uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Network network = service.get(id);
        if (!file.isEmpty())
            network.setImage(imageService.save(file));
        return service.save(network);
    }
}
