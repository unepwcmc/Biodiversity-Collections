package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Sample implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private SampleStatus status;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    @RestResource(exported = false)
    private BiodiversityCollection collection;

    @ManyToOne
    @JoinColumn(name = "curator_id")
    @RestResource(exported = false)
    private Curator curator;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    @RestResource(exported = false)
    private Institution institution;

    @OneToOne
    @JoinColumn(name = "taxonomy_id")
    @RestResource(exported = false)
    private Taxonomy taxonomy;

    @OneToMany
    @JoinColumn(name = "sample_id")
    @RestResource(exported = false)
    private Set<Document> documents;

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

}