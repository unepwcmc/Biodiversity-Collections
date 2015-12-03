package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;

@Entity
public class Taxonomy implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kingdom;

    private String phylum;

    private String hierarchyClass;

    @Column(name = "hierarchyOrder")
    private String order;

    private String family;

    private String genus;

    private String subspecies;

    private String speciesEpiteth;

    private String scientificName;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getKingdom() {
        return kingdom;
    }

    public void setKingdom(String kingdom) {
        this.kingdom = kingdom;
    }

    public String getPhylum() {
        return phylum;
    }

    public void setPhylum(String phylum) {
        this.phylum = phylum;
    }

    public String getHierarchyClass() {
        return hierarchyClass;
    }

    public void setHierarchyClass(String hierarchyClass) {
        this.hierarchyClass = hierarchyClass;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public String getGenus() {
        return genus;
    }

    public void setGenus(String genus) {
        this.genus = genus;
    }

    public String getSubspecies() {
        return subspecies;
    }

    public void setSubspecies(String subspecies) {
        this.subspecies = subspecies;
    }

    public String getSpeciesEpiteth() {
        return speciesEpiteth;
    }

    public void setSpeciesEpiteth(String speciesEpiteth) {
        this.speciesEpiteth = speciesEpiteth;
    }

    public String getScientificName() {
        return scientificName;
    }

    public void setScientificName(String scientificName) {
        this.scientificName = scientificName;
    }

}