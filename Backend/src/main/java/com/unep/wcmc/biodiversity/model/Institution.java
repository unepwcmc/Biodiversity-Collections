package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.Set;

@Entity
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

    @Embedded
    private Contact contact;

    @OneToMany
    @JoinColumn(name = "institution_id")
    private Set<Curator> curators;

    @OneToMany(mappedBy = "institution")
    private Set<BiodiversityCollection> collections;

    @ManyToMany(mappedBy = "institutions")
    @RestResource(rel = "institutionNetworks")
    private Set<Network> networks;

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
        return curators;
    }

    public void setCurators(Set<Curator> curators) {
        this.curators = curators;
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
}
