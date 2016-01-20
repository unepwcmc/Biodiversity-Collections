package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.dto.ErrorMessage;
import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.service.*;
import com.unep.wcmc.biodiversity.support.AbstractController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/institutions")
public class InstitutionController extends AbstractController<Institution, InstitutionService> {

    @Autowired
    private NetworkService networkService;

    @Autowired
    private BiodiversityCollectionService collectionService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private CuratorService curatorService;

    @Override
    public Object read(@PathVariable String id) {
        return service.getRepository().getById(new Long(id));
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/name")
    public Page<Institution> name(@RequestParam String name,
                                  @PageableDefault(page = 0, size = 10) Pageable pageable) {
        return service.getRepository().findByNameContainingIgnoreCaseOrderByNameAsc(name, pageable);
    }

    @RequestMapping(method= RequestMethod.GET, value="/search/autocompleteName")
    public List<Institution> autocomplete(@RequestParam String name) {
        return service.getRepository().findTop5ByNameContainingIgnoreCaseOrderByNameAsc(name);
    }

    @RequestMapping(method= RequestMethod.POST, value="/{id}/media")
    public Institution uploadMedia(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Institution institution = service.getRepository().getById(id);
        if (!file.isEmpty())
            institution.addImage(imageService.save(file));
        return service.save(institution);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/network/{networkId}")
    public Institution addNetwork(@PathVariable Long id, @PathVariable Long networkId) {
        Institution institution = service.get(id);
        Network network = networkService.get(networkId);
        network.addInstitution(institution);
        networkService.save(network);
        return institution;
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/network/{networkId}")
    public Institution removeNetwork(@PathVariable Long id, @PathVariable Long networkId) {
        Institution institution = service.get(id);
        Network network = networkService.get(networkId);
        network.removeInstitution(institution);
        networkService.save(network);
        return institution;
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/collection/{collectionId}")
    public Institution addCollection(@PathVariable Long id, @PathVariable Long collectionId) {
        Institution institution = service.get(id);
        BiodiversityCollection collection = collectionService.get(collectionId);
        collection.setInstitution(institution);
        collectionService.save(collection);
        return institution;
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/{id}/collection/{collectionId}")
    public Institution removeCollection(@PathVariable Long id, @PathVariable Long collectionId) {
        Institution institution = service.get(id);
        BiodiversityCollection collection = collectionService.get(collectionId);
        collection.setInstitution(null);
        collectionService.save(collection);
        return institution;
    }

    @RequestMapping(method= RequestMethod.PUT, value="/{id}/curator/{curatorId}")
    public Institution addCurator(@PathVariable Long id, @PathVariable Long curatorId) {

        Curator curator = curatorService.get(curatorId);

        Institution institution = service.get(id);
                    curator.getAssociatedInstitutions().add(institution);
                    curatorService.save(curator);

        return service.save(institution);
    }

    @RequestMapping(method= RequestMethod.DELETE, value = "/{id}")
    public Object delete(@PathVariable String id) {

        Institution institution = service.get(Long.valueOf(id));

        institution.getCollections().forEach( collection -> {
            if(collection.getInstitution().equals(institution)){
                collection.setInstitution(null);
                collectionService.save(collection);
            }
        });

        /*for (BiodiversityCollection collection : institution.getCollections()) {
            if(collection.getInstitution().equals(institution)){
                collection.setInstitution(null);
                collectionService.save(collection);
            }
        }*/

        if (service.delete(Long.valueOf(id))) {
            return new SuccessResponse();
        }
        final Long entityId = Long.valueOf(id);
        return new ErrorMessage(entityId, "no matches found");
    }

}