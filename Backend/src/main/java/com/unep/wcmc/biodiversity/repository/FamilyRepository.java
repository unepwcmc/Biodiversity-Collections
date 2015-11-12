package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Family;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyRepository extends JpaRepository<Family, Long> {
}
