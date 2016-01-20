package com.unep.wcmc.biodiversity.support;

import com.unep.wcmc.biodiversity.dto.ErrorMessage;
import com.unep.wcmc.biodiversity.dto.SuccessResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

    @RequestMapping(method = RequestMethod.GET)
    public Page<E> all(@PageableDefault(page = 0, size = 10) Pageable pageable){
        return service.list(pageable);
    }

    @RequestMapping(method = RequestMethod.POST)
    public E create(@RequestBody E e){
        return service.save(e);
    }

    @RequestMapping(method= RequestMethod.GET, value = "/{id}")
    public Object read(@PathVariable String id) {
        final Long entityId = Long.valueOf(id);
        final E entity = service.get(entityId);
        return entity == null ? new ErrorMessage(entityId, "no matches found") : entity;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public E update(@RequestBody E e, @PathVariable String id){
        final E obj = service.get(Long.valueOf(id));
        return obj == null ? null : service.save(e);
    }

    @RequestMapping(method= RequestMethod.DELETE, value = "/{id}")
    public Object delete(@PathVariable String id) {
        if (service.delete(Long.valueOf(id))) {
            return SUCCESS_RESPONSE;
        }
        final Long entityId = Long.valueOf(id);
        return new ErrorMessage(entityId, "no matches found");
    }
}