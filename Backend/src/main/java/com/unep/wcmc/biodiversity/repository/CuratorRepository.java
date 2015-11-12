package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CuratorRepository extends JpaRepository<Curator, Long> {
}
