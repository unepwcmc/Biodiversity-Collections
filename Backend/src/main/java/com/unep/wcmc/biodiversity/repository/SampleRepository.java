package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleRepository extends JpaRepository<Sample, Long> {
}
