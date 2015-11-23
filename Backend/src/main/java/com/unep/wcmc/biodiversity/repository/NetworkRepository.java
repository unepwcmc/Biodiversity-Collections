package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.support.AbstractRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;

public interface NetworkRepository extends AbstractRepository<Network> {

    Page<Network> findAllByCollectionsIn( Collection<BiodiversityCollection> collection, Pageable page);
}
