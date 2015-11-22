package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
