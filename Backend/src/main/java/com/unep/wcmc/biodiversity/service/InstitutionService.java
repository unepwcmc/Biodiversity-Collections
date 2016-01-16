package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    @Override
    public Institution save(Institution institution) {
        Set<Curator> curators = institution.getCurators();
        institution.setCurators(null);
        institution = super.save(institution);
        institution.setCurators(curators);
        return super.save(institution);
    }
}
