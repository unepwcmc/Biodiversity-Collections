package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Network;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NetworkRepository extends JpaRepository<Network, Long> {
}
