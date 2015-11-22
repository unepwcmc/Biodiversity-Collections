package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Institution;
import com.unep.wcmc.biodiversity.repository.InstitutionRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class InstitutionService extends AbstractService<Institution, InstitutionRepository> {

    public Page<Institution> findByDescriptionStartsWith(String name, Pageable p){
        return repo.findByDescriptionStartsWith(name, p);
    }
}
