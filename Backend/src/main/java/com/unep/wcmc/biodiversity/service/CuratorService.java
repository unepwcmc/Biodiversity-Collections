package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.repository.CuratorRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CuratorService extends AbstractService<Curator, CuratorRepository> {

    public Page<Curator> findByNameStartsWith(String name, Pageable p){
        return repo.findByNameStartsWith(name, p);
    }

}
