package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedEntityGraph(name = "Institution.detail",
        attributeNodes = {
                @NamedAttributeNode("curators"),
                @NamedAttributeNode("networks")
        }
    )
public class Institution implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "text")
    private String description;

    private String type;

    private String discipline;

    private String governance;

    private String webSite;

    private String webSiteName;

    @Embedded
    private Contact contact;

    @ManyToMany
    @JoinTable(name = "curator_institution",
            joinColumns = @JoinColumn(name = "institution_id"),
            inverseJoinColumns = @JoinColumn(name = "curator_id"))
    private Set<Curator> curators;

    @OneToMany(mappedBy = "institution")
    @JsonIgnore
    private Set<BiodiversityCollection> collections;

    @ManyToMany(mappedBy = "institutions")
    @JsonIgnore
    private Set<Network> networks;

    @ElementCollection(fetch = FetchType.EAGER)
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public String getGovernance() {
        return governance;
    }

    public void setGovernance(String governance) {
        this.governance = governance;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Set<Curator> getCurators() {
        if (this.curators == null) {
            this.curators = new HashSet<>();
        }
        return this.curators;
    }

    public void setCurators(Set<Curator> curators) {
        this.curators = curators;
    }

    public void addCurators(Curator c){
        getCurators().add(c);
    }

    public void removeCurators(Curator c){
        getCurators().remove(c);
    }

    public Set<BiodiversityCollection> getCollections() {
        return collections;
    }

    public void setCollections(Set<BiodiversityCollection> collections) {
        this.collections = collections;
    }

    public Set<Network> getNetworks() {
        return networks;
    }

    public void setNetworks(Set<Network> networks) {
        this.networks = networks;
    }

    public String getWebSiteName() {
        return webSiteName;
    }

    public void setWebSiteName(String webSiteName) {
        this.webSiteName = webSiteName;
    }

    public Set<Image> getImages() {
        return images == null? new HashSet<Image>(): this.images;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public void addImage(Image image){
        if(getImages().size() < 5){
            getImages().add(image);
        }
    }

    public  void removeImage(Image image){
        getImages().remove(image);
    }
}
