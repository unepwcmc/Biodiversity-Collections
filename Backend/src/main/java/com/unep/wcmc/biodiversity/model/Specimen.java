package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;

@Entity
public class Specimen implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @Column(name = "specimen_count")
    private Long count;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BiodiversityCollection collection;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public BiodiversityCollection getCollection() {
        return collection;
    }

    public void setCollection(BiodiversityCollection collection) {
        this.collection = collection;
    }
}