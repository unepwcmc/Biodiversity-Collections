package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.hibernate.annotations.Cascade;

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

    @ElementCollection
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Image> images;
    @Embedded
    private Contact contact;

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

    @ElementCollection
    @CollectionTable(name = "board_members", joinColumns = @JoinColumn(name = "network_id"))
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
        return collections == null? new HashSet<>(): this.collections;
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
        return institutions == null? new HashSet<>(): this.institutions;
    }

    public void setInstitutions(Set<Institution> institutions) {
        this.institutions = institutions;
    }

    public void addInstitution(Institution institution){
        getInstitutions().add(institution);
    }

    public void removeInstitution(Institution institution){
        getInstitutions().remove(institution);
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean getStatus() {
        return status;
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