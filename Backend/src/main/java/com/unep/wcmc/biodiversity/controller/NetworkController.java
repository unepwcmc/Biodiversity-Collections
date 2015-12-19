package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.service.InstitutionService;
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
    private BiodiversityCollectionService collectionService;

    @Autowired
    private InstitutionService institutionService;

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
    public Page<Network> searchByCollection(@PathVariable Long collectionId,
                                                    @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByCollectionsInOrderByNameAsc(
                new ArrayList<BiodiversityCollection>() {{ add( collectionService.get(collectionId) ); }},
                pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/collection/{collectionId}/network/{name}")
    public Page<Network> searchByNotInCollection(@PathVariable("name") String name,
                                                         @PathVariable("collectionId") Long collectionId,
                                                         @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingAndCollectionsNotInOrCollectionsIsNullOrderByNameAsc(name,
                new ArrayList<BiodiversityCollection>() {{ add( collectionService.get(collectionId) ); }}, pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/institution/{institutionId}/network/{name}")
    public Page<Network> searchByNotInInstitution(@PathVariable("name") String name,
                                                          @PathVariable("institutionId") Long institutionId,
                                                          @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingAndInstitutionsNotInOrInstitutionsIsNullOrderByNameAsc(name,
                new ArrayList<Institution>() {{ add( institutionService.get(institutionId) ); }}, pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/institution/{institutionId}")
    public Page<Network> searchByNetwork(@PathVariable Long institutionId,
                                         @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByInstitutionsInOrderByNameAsc(
                new ArrayList<Institution>() {{ add( institutionService.get(institutionId) ); }},
                pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Network uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Network network = service.get(id);

        if (!file.isEmpty())
             network.addImage(imageService.save(file));

        return service.save(network);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/collection/{collectionId}")
    public Network addCollection(@PathVariable Long id, @PathVariable Long collectionId) {
        Network network = service.get(id);
        BiodiversityCollection collection = collectionService.get(collectionId);
        collection.addNetwork(network);
        network.addCollection(collection);
        return service.save(network);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/collection/{collectionId}")
    public Network removeCollection(@PathVariable Long id, @PathVariable Long collectionId) {
        Network network = service.get(id);
        BiodiversityCollection collection = collectionService.get(collectionId);
        collection.removeNetwork(network);
        network.removeCollection(collection);
        return service.save(network);
    }

}