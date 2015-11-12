package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Specimen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecimenRepository extends JpaRepository<Specimen, Long> {
}
