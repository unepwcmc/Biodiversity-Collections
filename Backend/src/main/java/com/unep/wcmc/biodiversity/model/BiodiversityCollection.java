package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class BiodiversityCollection implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "text")
    private String description;

    private String preservationMethods;

    private String webSite;

    private String webSiteName;

    private String curatorialLodge;

    private Boolean published;

    @Enumerated(EnumType.STRING)
    private CollectionType type;

    @Embedded
    private Contact contact;

    @ManyToOne
    @JoinColumn(name = "curator_id")
    private Curator curator;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @ManyToMany(mappedBy = "collections", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Network> networks;

    @ElementCollection
    @CollectionTable(name = "researcher", joinColumns = @JoinColumn(name = "collection_id"))
    private Set<Researcher> researchers;

    @OneToMany(mappedBy = "collection")
    @JsonIgnore
    private Set<Sample> samples;

    @ElementCollection
    @CollectionTable(name = "specimen", joinColumns = @JoinColumn(name = "collection_id"))
    private Set<Specimen> specimens;

    @OneToMany(mappedBy = "collection")
    @JsonIgnore
    private Set<Document> documents;

    @ElementCollection
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Image> images;

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

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
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

    public void addNetwork(Network network){
        getNetworks().add(network);
    }

    public void removeNetwork(Network network){
        getNetworks().remove(network);
    }

    public Set<Network> getNetworks() {
        return networks == null? new HashSet<Network>(): this.networks;
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
        return samples == null? new HashSet<>(): this.samples;
    }

    public void setSamples(Set<Sample> samples) {
        this.samples = samples;
    }

    public void addSample(Sample sample) {
        getSamples().add(sample);
    }

    public void removeSample(Sample sample) {
        getSamples().remove(sample);
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Specimen> getSpecimens() {
        return specimens == null? new HashSet<Specimen>(): this.specimens;
    }

    public void setSpecimens(Set<Specimen> specimens) {
        this.specimens = specimens;
    }

    public void addSpecimen(Specimen specimen){
        getSpecimens().add(specimen);
    }

    public void removeSpecimen(Specimen specimen){
        getSpecimens().remove(specimen);
    }

    public String getCuratorialLodge() {
        return curatorialLodge;
    }

    public void setCuratorialLodge(String curatorialLodge) {
        this.curatorialLodge = curatorialLodge;
    }

    public String getWebSiteName() {
        return webSiteName;
    }

    public void setWebSiteName(String webSiteName) {
        this.webSiteName = webSiteName;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Set<Image> getImages() {
        return images == null? new HashSet<Image>(): this.images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public void addImage(Image image){
        getImages().add(image);
    }

    public  void removeImage(Image image){
        getImages().remove(image);
    }
}
