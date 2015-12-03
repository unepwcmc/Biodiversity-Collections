package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Network implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "text")
    private String description;

    private boolean status;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    @RestResource(exported = false)
    private Image image;

    @Embedded
    private Contact contact;

    @ManyToMany
    @JoinTable(name = "network_biodiversity_collection",
            joinColumns = @JoinColumn(name = "network_id"),
            inverseJoinColumns = @JoinColumn(name = "collection_id"))
    @RestResource(exported = false)
    private Set<BiodiversityCollection> collections;

    @ManyToMany
    @JoinTable(name = "network_institution",
            joinColumns = @JoinColumn(name = "network_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id"))
    private Set<Institution> institutions;

    @ElementCollection
    @CollectionTable(name = "board_members", joinColumns = @JoinColumn(name = "network_id"))
    @RestResource(exported = false)
    private Set<Member> boardMembers;

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

    public Set<Member> getBoardMembers() {
        return boardMembers;
    }

    public void setBoardMembers(Set<Member> boardMembers) {
        this.boardMembers = boardMembers;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Set<BiodiversityCollection> getCollections() {
        return collections == null? new HashSet<BiodiversityCollection>(): this.collections;
    }

    public void setCollections(Set<BiodiversityCollection> collections) {
        this.collections = collections;
    }

    public void addCollection(BiodiversityCollection collection){
        getCollections().add(collection);
    }

    public void removeCollection(BiodiversityCollection collection){
        getCollections().remove(collection);
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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

}