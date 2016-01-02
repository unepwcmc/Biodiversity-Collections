package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    /*public List<Institution> findAllByCurator(Curator curator){
        return repo.findAllByAssociatedInstitutionsIn(new ArrayList<Curator>(Arrays.asList(curator)));
    }*/
}
