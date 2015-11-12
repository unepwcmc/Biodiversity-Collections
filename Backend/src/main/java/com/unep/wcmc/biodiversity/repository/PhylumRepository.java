package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Phylum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhylumRepository extends JpaRepository<Phylum, Long> {
}
