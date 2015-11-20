package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Specimen;
import com.unep.wcmc.biodiversity.service.BiodiversityCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/collections")
public class BiodiversityCollectionController {

    @Autowired
    private BiodiversityCollectionService biodiversityCollectionService;

    @RequestMapping(value = "/add" ,method= RequestMethod.POST)
    public BiodiversityCollection add(@RequestBody BiodiversityCollection e){

        return biodiversityCollectionService.save(e);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/edit/{id}")
    public BiodiversityCollection edit(@RequestBody BiodiversityCollection e, @PathVariable Long id){
        final BiodiversityCollection obj = biodiversityCollectionService.get(id);

        return obj == null ? null : biodiversityCollectionService.save(e);
    }

    @RequestMapping(method= RequestMethod.PUT, value="/add/specimen/{id}",consumes="application/json")
    public BiodiversityCollection addSpecimens(@RequestBody Specimen e, @PathVariable Long id){
        System.out.print(e.getType());
        BiodiversityCollection obj = biodiversityCollectionService.get(id);
                                     obj.addSpecimen(e);

        return biodiversityCollectionService.save(obj);
    }

    @RequestMapping(method= RequestMethod.DELETE, value="/delete/specimen/{id}")
    public BiodiversityCollection removeSpecimens(@RequestBody Specimen e, @PathVariable Long id){

        BiodiversityCollection obj = biodiversityCollectionService.get(id);
        obj.removeSpecimen(e);

        return biodiversityCollectionService.save(obj);
    }
}
