package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.repository.CuratorRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class CuratorService extends AbstractService<Curator, CuratorRepository> {
}
