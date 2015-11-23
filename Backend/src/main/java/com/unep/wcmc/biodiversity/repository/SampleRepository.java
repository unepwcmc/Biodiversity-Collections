package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SampleRepository extends AbstractRepository<Sample> {

    Page<Sample> findAllByCollection(BiodiversityCollection collection, Pageable p);
}
