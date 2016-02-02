package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.*;
import com.unep.wcmc.biodiversity.security.SecurityUtils;
import com.unep.wcmc.biodiversity.service.*;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/collections")
public class BiodiversityCollectionController extends AbstractController<BiodiversityCollection, BiodiversityCollectionService> {

    @Autowired
    private ImageService imageService;

    @Autowired
    private NetworkService networkService;

    @Autowired
    private InstitutionService institutionService;

    @Autowired
    private SampleService sampleService;

    @Override
    public Object read(@PathVariable String id) {
        return service.getRepository().getById(new Long(id));
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<BiodiversityCollection> name(@RequestParam String name,
                             @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.searchByName(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public List<BiodiversityCollection> autocomplete(@RequestParam String name) {
        return service.searchByNameTop5(name);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/definition")
    public Page<BiodiversityCollection> findAllCollectionDefinition(
            @RequestParam(value = "name", defaultValue = "ALL") String name,
            @PageableDefault(page = 0, size = 10) Pageable pageable) {
        switch (name) {
            case "ALL":
                return service.searchAll(pageable);
            default:
                return service.searchByDefinition(name, pageable);
        }
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/coordinates/definition")
    public List<Object[]> findAllCoordinatesDefinition(@RequestParam(value = "name", defaultValue = "ALL") String name) {
        switch (name) {
            case "ALL":
                return service.searchCoordinates();
            default:
                return service.searchCoordinatesByDefinition(name);
        }
    }


    @RequestMapping(method= RequestMethod.GET, value="/search/institutions")
    public Page<BiodiversityCollection> institutions(@RequestParam Long id,
                                                     @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByInstitutionIdOrderByNameAsc(id, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/networks")
    public Page<BiodiversityCollection> networks(@RequestParam Long id,
                                                 @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNetworksIdOrderByNameAsc(id, pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public BiodiversityCollection uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        BiodiversityCollection biodiversityCollection = service.get(id);
        if (!file.isEmpty())
            biodiversityCollection.addImage(imageService.save(file));

        return service.save(biodiversityCollection);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/medias")
    public BiodiversityCollection uploadMedia(@PathVariable Long id, @RequestParam("files[]") List<MultipartFile> files) {
        BiodiversityCollection biodiversityCollection = service.get(id);
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                biodiversityCollection.addImage(imageService.save(file));
            }
        }
        return service.save(biodiversityCollection);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/network/{networkId}")
    public BiodiversityCollection addNetwork(@PathVariable Long id, @PathVariable Long networkId) {
        BiodiversityCollection collection = service.get(id);
        Network network = networkService.get(networkId);
                network.addCollection(collection);
                networkService.save(network);
        return service.save(collection);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/network/{networkId}")
    public BiodiversityCollection removeNetwork(@PathVariable Long id, @PathVariable Long networkId) {
        BiodiversityCollection collection = service.get(id);
        Network network = networkService.get(networkId);
                network.removeCollection(collection);
                networkService.save(network);
        return service.save(collection);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/sample/{sampleId}")
    public BiodiversityCollection removeSample(@PathVariable Long id, @PathVariable Long sampleId) {
        BiodiversityCollection collection = service.get(id);

        Sample sample = sampleService.get(sampleId);
        collection.removeSample(sample);

        //sample.setCollection(null);
        sampleService.delete(sample.getId());

        return service.save(collection);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/samples")
    public BiodiversityCollection addSamples(@PathVariable Long id, @RequestBody List<Long> sampleIds) {
        BiodiversityCollection collection = service.get(id);
        for (Long sampleId : sampleIds) {
            Sample sample = sampleService.get(sampleId);
            sample.setCollection(collection);
            sampleService.save(sample);
            collection.addSample(sample);
        }
        return collection;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/institution/{institutionId}/collection")
    public Page<BiodiversityCollection> searchByNotInInstitution(@RequestParam("name") String name,
                                                                 @PathVariable("institutionId") Long institutionId,
                                                                 @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingAndInstitutionNotInOrInstitutionIsNullOrderByNameAsc(name,
                institutionService.get(institutionId), pageable);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/search/not/network/{networkId}/collection")
    public Page<BiodiversityCollection> searchByNotInNetworks(@RequestParam("name") String name,
                                                              @PathVariable("networkId") Long networkId,
                                                              @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNetworksNotIn(name,
                new ArrayList<Network>() {{ add( networkService.get(networkId) ); }}, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/count/type")
    public List<Object[]> countByType() {
        return service.getRepository().countByInstitutionType();
    }

    @RequestMapping(method= RequestMethod.GET, value="/count/definition")
    public List<Object[]> countByDefinition() {
        return service.getRepository().countByCollectionDefinition();
    }

}
