package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.model.Specimen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecimenRepository extends JpaRepository<Specimen, Long> {

    public Page<Sample> findAllByCollection(BiodiversityCollection collection, Pageable p);
}
