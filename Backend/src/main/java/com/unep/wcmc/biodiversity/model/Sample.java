package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Sample implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private SampleStatus status;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BiodiversityCollection collection;

    @ManyToOne
    @JoinColumn(name = "curator_id")
    private Curator curator;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "taxonomy_id")
    private Taxonomy taxonomy;

    @OneToMany
    @JoinColumn(name = "sample_id")
    private Set<Document> documents;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image image;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SampleStatus getStatus() {
        return status;
    }

    public void setStatus(SampleStatus status) {
        this.status = status;
    }

    public BiodiversityCollection getCollection() {
        return collection;
    }

    public void setCollection(BiodiversityCollection collection) {
        this.collection = collection;
    }

    public Curator getCurator() {
        return curator;
    }

    public void setCurator(Curator curator) {
        this.curator = curator;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public Taxonomy getTaxonomy() {
        return taxonomy;
    }

    public void setTaxonomy(Taxonomy taxonomy) {
        this.taxonomy = taxonomy;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}