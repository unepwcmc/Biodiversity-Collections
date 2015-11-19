package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.BiodiversityCollection;
import com.unep.wcmc.biodiversity.model.Network;
import com.unep.wcmc.biodiversity.repository.NetworkRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NetworkService extends AbstractService<Network, NetworkRepository> {

    public Page<Network> findAllNetworkByCollection(BiodiversityCollection biodiversityCollection, Pageable pageable){
        return repo.findAllByCollectionsIn( new ArrayList<BiodiversityCollection>() {{ add( biodiversityCollection ); }}, pageable);
    }
}
