package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/networks")
public class NetworkController extends AbstractController<Network, NetworkService> {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @Autowired
    private ImageService imageService;

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<Network> name(@RequestParam String name,
                              @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public List<Network> autocomplete(@RequestParam String name) {
        return service.getRepository().findTop5ByNameContainingOrderByNameAsc(name);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/collection/{collectionId}")
    public Page<Network> findAllNetworkByCollection(@PathVariable Long collectionId,
                                                    @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findAllByCollectionsIn( new ArrayList<BiodiversityCollection>() {{
            add( biodiversityCollectionService.get(collectionId) ); }}, pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/collection/{collectionId}/network/{name}")
    public Page<Network> findAllNetworkByNotInCollection(@PathVariable("name") String name,
                                                         @PathVariable("collectionId") Long collectionId,
                                                         @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByCollectionsNotInOrCollectionsIsNullAndNameContainingOrderByNameAsc(
                new ArrayList<BiodiversityCollection>() {{ add( biodiversityCollectionService.get(collectionId) ); }},
                name, pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/institutionNetworks")
    public Page<Network> institutionsNetworks(@RequestParam Long id,
                                              @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByInstitutionsIdOrderByNameAsc(id, pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Network uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Network network = service.get(id);
        if (!file.isEmpty())
            network.setImage(imageService.save(file));
        return service.save(network);
    }
}