package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;

@Entity
public class Taxonomy implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "kingdom_id")
    private Kingdom kingdom;

    @ManyToOne
    @JoinColumn(name = "phylum_id")
    private Phylum phylum;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private HierarchyClass hierarchyClass;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private HierarchyOrder order;

    @ManyToOne
    @JoinColumn(name = "family_id")
    private Family family;

    @ManyToOne
    @JoinColumn(name = "genus_id")
    private Genus genus;

    @Column(name = "subspecies")
    private String subspecies;

    @Column(name = "species_epiteth")
    private String speciesEpiteth;

    @Column(name = "scientific_name")
    private String scientificName;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Kingdom getKingdom() {
        return kingdom;
    }

    public void setKingdom(Kingdom kingdom) {
        this.kingdom = kingdom;
    }

    public Phylum getPhylum() {
        return phylum;
    }

    public void setPhylum(Phylum phylum) {
        this.phylum = phylum;
    }

    public HierarchyClass getHierarchyClass() {
        return hierarchyClass;
    }

    public void setHierarchyClass(HierarchyClass hierarchyClass) {
        this.hierarchyClass = hierarchyClass;
    }

    public HierarchyOrder getOrder() {
        return order;
    }

    public void setOrder(HierarchyOrder order) {
        this.order = order;
    }

    public Family getFamily() {
        return family;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public String getSubspecies() {
        return subspecies;
    }

    public void setSubspecies(String subspecies) {
        this.subspecies = subspecies;
    }

    public Genus getGenus() {
        return genus;
    }

    public void setGenus(Genus genus) {
        this.genus = genus;
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