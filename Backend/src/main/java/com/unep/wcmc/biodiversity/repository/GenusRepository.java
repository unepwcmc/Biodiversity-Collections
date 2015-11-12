package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Genus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenusRepository extends JpaRepository<Genus, Long> {
}
