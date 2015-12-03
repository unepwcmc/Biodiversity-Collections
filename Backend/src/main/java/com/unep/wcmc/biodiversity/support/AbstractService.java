package com.unep.wcmc.biodiversity.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

/**
 * Abstract service that encapsulates all boilerplate code needed to
 * create a simple service object
 * 
 * @param <E> entity object that extends from {@link BaseEntity}
 * @param <R> repository that implements basic operations from {@link CrudRepository}
 */
public abstract class AbstractService<E extends BaseEntity, R extends JpaRepository<E, Long>> implements BaseService<E> {
	
	@Autowired
	protected R repo;

	protected static Logger log = LoggerFactory.getLogger(AbstractService.class);
	
	@Override
	public E save(E entity) {
		return repo.save(entity);
	}

	@Override
	public Page<E> list(Pageable pageable) {
		return repo.findAll(pageable);
	}

	@Override
	public Boolean delete(Long id) {
		repo.delete(id);
		return Boolean.TRUE;
	}

	@Override
	public E get(Long id) {
		return repo.findOne(id);
	}

	public R getRepository() {
		return repo;
	}

}
