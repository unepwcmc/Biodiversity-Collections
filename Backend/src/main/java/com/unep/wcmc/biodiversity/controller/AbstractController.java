package com.unep.wcmc.biodiversity.controller;

import com.unep.wcmc.biodiversity.model.BaseEntity;
import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import com.unep.wcmc.biodiversity.dto.ErrorMessage;
import com.unep.wcmc.biodiversity.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * Abstract controller that encapsulates all boilerplate code needed to
 * create a simple controller object
 * 
 * @param <E> entity object that extends from {@link BaseEntity}
 * @param <S> service that implements basic operations from {@link BaseService}
 */
public abstract class AbstractController<E extends BaseEntity, 
										 S extends BaseService<E>> {

    protected static Logger log = LoggerFactory.getLogger(AbstractController.class);

    private static final SuccessResponse SUCCESS_RESPONSE = new SuccessResponse();

	@Autowired
	protected S service;

    @PreAuthorize("isAnonymous() or isAuthenticated()")
	@RequestMapping(method= RequestMethod.GET)
    public List<E> index() {
        return service.list();
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method= RequestMethod.POST)
    public E add(@RequestBody E e){
        return service.save(e);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method= RequestMethod.PUT, value="{id}")
    public E edit(@RequestBody E e, @PathVariable String id){
        final E obj = service.get(Long.valueOf(id));
        return obj == null ? null : service.save(e);
    }

    @PreAuthorize("isAnonymous() or isAuthenticated()")
    @RequestMapping(method= RequestMethod.GET, value="{id}")
    public Object view(@PathVariable String id) {
        final Long entityId = Long.valueOf(id);
        final E entity = service.get(entityId);
        return entity == null ? new ErrorMessage(entityId, "no matches found") : entity;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(method= RequestMethod.DELETE, value="{id}")
    public Object delete(@PathVariable String id) {
        if (service.delete(Long.valueOf(id))) {
            return SUCCESS_RESPONSE;
        }
        final Long entityId = Long.valueOf(id);
        return new ErrorMessage(entityId, "no matches found");
    }
}
