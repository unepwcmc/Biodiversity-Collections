package com.unep.wcmc.biodiversity.support;

import java.io.Serializable;

public interface BaseEntity extends Serializable {

    Long getId();

    void setId(Long id);

}