package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Taxonomy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxonomyRepository extends JpaRepository<Taxonomy, Long> {
}
