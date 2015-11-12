package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Researcher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResearcherRepository extends JpaRepository<Researcher, Long> {

}
