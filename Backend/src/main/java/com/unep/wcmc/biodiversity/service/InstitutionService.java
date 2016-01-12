package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Institution save(Institution institution) {
        if (institution.getCurators() != null) {
            for (Curator curator : institution.getCurators()) {
                curator.addAssociatedInstitution(institution);
            }
        }
        institution = super.save(institution);
        entityManager.detach(institution);
        return get(institution.getId());
    }
}
