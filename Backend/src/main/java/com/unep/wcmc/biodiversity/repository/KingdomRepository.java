package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Kingdom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KingdomRepository extends JpaRepository<Kingdom, Long> {
}
