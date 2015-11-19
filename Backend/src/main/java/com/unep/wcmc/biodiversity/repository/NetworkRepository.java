package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Network;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface NetworkRepository extends JpaRepository<Network, Long> {

    public Page<Network> findAllByCollectionsIn( Collection<BiodiversityCollection> collection, Pageable page);
}
