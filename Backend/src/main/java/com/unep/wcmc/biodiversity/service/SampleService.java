package com.unep.wcmc.biodiversity.service;

import com.unep.wcmc.biodiversity.model.Sample;
import com.unep.wcmc.biodiversity.repository.SampleRepository;
import com.unep.wcmc.biodiversity.support.AbstractService;
import org.springframework.stereotype.Service;

@Service
public class SampleService extends AbstractService<Sample, SampleRepository> {

}
