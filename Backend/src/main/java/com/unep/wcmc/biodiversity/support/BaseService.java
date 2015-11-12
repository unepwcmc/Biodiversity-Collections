package com.unep.wcmc.biodiversity.support;

import java.util.List;

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
    List<T> list();

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
