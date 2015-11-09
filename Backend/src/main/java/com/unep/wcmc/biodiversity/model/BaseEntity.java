package com.unep.wcmc.biodiversity.model;

import java.io.Serializable;

public interface BaseEntity extends Serializable {

    Long getId();

    void setId(Long id);

}