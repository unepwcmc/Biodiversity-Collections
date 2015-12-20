package com.unep.wcmc.biodiversity.model;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class Member implements Serializable {

    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;*/

    private String name;

    private String relationshipToTheCollection;

    private String doingWithTheCollection;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image image;

    /*public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }*/

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getRelationshipToTheCollection() {
        return relationshipToTheCollection;
    }

    public void setRelationshipToTheCollection(String relationshipToTheCollection) {
        this.relationshipToTheCollection = relationshipToTheCollection;
    }

    public String getDoingWithTheCollection() {
        return doingWithTheCollection;
    }

    public void setDoingWithTheCollection(String doingWithTheCollection) {
        this.doingWithTheCollection = doingWithTheCollection;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Member)) return false;

        Member that = (Member) o;

        return !(name != null ? !name.equals(that.name) : that.name != null);

    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }


}