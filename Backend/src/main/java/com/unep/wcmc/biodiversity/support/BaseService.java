package com.unep.wcmc.biodiversity.support;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseService<T> {

    /**
     * Saves a given entity. Use the returned instance for further operations as the save operation might have changed the
     * entity instance completely.
     *
     * @param entity
     * @return the saved entity
     */
    T save(T entity);

    /**
     * Returns all instances of the type.
     *
     * @return all entities
     */
    Page<T> list(Pageable pageable);

    /**
     * Deletes a given entity.
     *
     * @param id
     */
    Boolean delete(Long id);

    /**
     * View a given entity.
     *
     * @param id
     */
    T get(Long id);
}
