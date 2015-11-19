package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class BiodiversityCollection implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String preservationMethods;

    private String webSite;

    private String curatorialLodge;

    @Enumerated(EnumType.STRING)
    private CollectionType type;

    @ManyToOne
    @JoinColumn(name = "master_id")
    private BiodiversityCollection master;

    @ManyToOne
    @JoinColumn(name = "curator_id")
    private Curator curator;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @JsonIgnore
    @ManyToMany(mappedBy = "collections", fetch = FetchType.LAZY)
    private Set<Network> networks;

    @OneToMany
    @JoinColumn(name = "collection_id")
    private Set<Researcher> researchers;

    @JsonIgnore
    @OneToMany(mappedBy = "collection")
    private Set<Sample> samples;

    @OneToMany(mappedBy = "collection")
    private Set<Specimen> specimens;

    @JsonIgnore
    @OneToMany(mappedBy = "collection")
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreservationMethods() {
        return preservationMethods;
    }

    public void setPreservationMethods(String preservationMethods) {
        this.preservationMethods = preservationMethods;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public CollectionType getType() {
        return type;
    }

    public void setType(CollectionType type) {
        this.type = type;
    }

    public BiodiversityCollection getMaster() {
        return master;
    }

    public void setMaster(BiodiversityCollection master) {
        this.master = master;
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

    public Set<Network> getNetworks() {
        return networks;
    }

    public void setNetworks(Set<Network> networks) {
        this.networks = networks;
    }

    public Set<Researcher> getResearchers() {
        return researchers;
    }

    public void setResearchers(Set<Researcher> researchers) {
        this.researchers = researchers;
    }

    public Set<Sample> getSamples() {
        return samples;
    }

    public void setSamples(Set<Sample> samples) {
        this.samples = samples;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Specimen> getSpecimens() {
        return specimens;
    }

    public void setSpecimens(Set<Specimen> specimens) {
        this.specimens = specimens;
    }

    public String getCuratorialLodge() {
        return curatorialLodge;
    }

    public void setCuratorialLodge(String curatorialLodge) {
        this.curatorialLodge = curatorialLodge;
    }
}
