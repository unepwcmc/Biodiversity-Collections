package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
}
