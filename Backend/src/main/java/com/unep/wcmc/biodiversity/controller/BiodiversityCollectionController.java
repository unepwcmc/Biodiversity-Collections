package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import com.unep.wcmc.biodiversity.service.ImageService;
import com.unep.wcmc.biodiversity.service.NetworkService;
import com.unep.wcmc.biodiversity.service.SampleService;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/collections")
public class BiodiversityCollectionController extends AbstractController<BiodiversityCollection, BiodiversityCollectionService> {

    @Autowired
    private ImageService imageService;

    @Autowired
    private NetworkService networkService;

    @Autowired
    private SampleService sampleService;

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<BiodiversityCollection> name(@RequestParam String name,
                             @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingOrderByNameAsc(name,pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocomplete")
    public List<BiodiversityCollection> autocomplete(@RequestParam String name) {
        return service.getRepository().findTop5ByNameContainingOrderByNameAsc(name);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/institutions")
    public List<BiodiversityCollection> institutions(@RequestParam Long id,
                                                     @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByInstitutionIdOrderByNameAsc(id, pageable);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public BiodiversityCollection uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        BiodiversityCollection biodiversityCollection = service.get(id);
        if (!file.isEmpty())
            biodiversityCollection.setImage(imageService.save(file));

        return service.save(biodiversityCollection);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/network/{networkId}")
    public BiodiversityCollection addNetwork(@PathVariable Long id, @PathVariable Long networkId){

        BiodiversityCollection collection = service.get(id);
        Network network = networkService.get(networkId);
                network.addCollection(collection);
                networkService.save(network);

        return service.save(collection);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/network/{networkId}")
    public BiodiversityCollection removeNetwork(@PathVariable Long id, @PathVariable Long networkId){

        BiodiversityCollection collection = service.get(id);
        Network network = networkService.get(networkId);
                network.removeCollection(collection);
                networkService.save(network);

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
}
