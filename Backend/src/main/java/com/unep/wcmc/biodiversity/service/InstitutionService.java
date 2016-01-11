package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    @Override
    public Institution save(Institution institution) {
        if (institution.getCurators() != null) {
            for (Curator curator : institution.getCurators()) {
                curator.addAssociatedInstitution(institution);
            }
        }
        return super.save(institution);
    }
}
