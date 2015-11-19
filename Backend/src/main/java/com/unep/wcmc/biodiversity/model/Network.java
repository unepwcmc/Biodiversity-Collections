package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Network implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String boardMembers;

    private boolean status;

    @ManyToMany
    @JoinTable(name = "network_biodiversity_collection",
            joinColumns = @JoinColumn(name = "network_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id"))
    private Set<BiodiversityCollection> collections;

    @ManyToMany
    @JoinTable(name = "network_institution",
            joinColumns = @JoinColumn(name = "network_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id"))
    private Set<Institution> institutions;

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

    public String getBoardMembers() {
        return boardMembers;
    }

    public void setBoardMembers(String boardMembers) {
        this.boardMembers = boardMembers;
    }

    public Set<BiodiversityCollection> getCollections() {
        return collections;
    }

    public void setCollections(Set<BiodiversityCollection> collections) {
        this.collections = collections;
    }

    public Set<Institution> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(Set<Institution> institutions) {
        this.institutions = institutions;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean getStatus() {
        return status;
    }
}