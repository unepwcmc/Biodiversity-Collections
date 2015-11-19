package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.model.Specimen;
import com.unep.wcmc.biodiversity.repository.SpecimenRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SpecimenService extends AbstractService<Specimen, SpecimenRepository> {

    public Page<Sample> findAllByCollection(BiodiversityCollection collection, Pageable page){
        return repo.findAllByCollection(collection, page);
    }
}
