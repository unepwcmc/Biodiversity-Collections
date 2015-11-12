package com.unep.wcmc.biodiversity.repository;

import com.unep.wcmc.biodiversity.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {

}
