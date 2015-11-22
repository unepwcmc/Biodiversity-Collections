package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Curator;
import com.unep.wcmc.biodiversity.model.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
