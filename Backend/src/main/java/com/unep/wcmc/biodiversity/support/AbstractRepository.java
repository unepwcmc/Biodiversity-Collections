package com.unep.wcmc.biodiversity.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AbstractRepository<E extends BaseEntity> extends JpaRepository<E, Long> {}