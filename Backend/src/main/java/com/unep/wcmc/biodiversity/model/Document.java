package com.unep.wcmc.biodiversity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.hibernate.annotations.Cascade;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.util.Set;

@Entity
public class Document implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String title;

    private String description;

    @ElementCollection
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<String> authors;

    @ElementCollection
    private Set<String> keyworks;

    @Enumerated(EnumType.STRING)
    private DocumentType type;

    private String contentType;

    private String mimeType;

    private boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "file_id")
    private Attachment attachment;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BiodiversityCollection collection;

    public Document(){}

    public Document(MultipartFile file) {
        try {
            this.setAttachment(new Attachment(file.getBytes()));

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public Set<String> getKeyworks() {
        return keyworks;
    }

    public void setKeyworks(Set<String> keyworks) {
        this.keyworks = keyworks;
    }

    public DocumentType getType() {
        return type;
    }

    public void setType(DocumentType type) {
        this.type = type;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    @JsonIgnore
    public BiodiversityCollection getCollection() {
        return collection;
    }

    @JsonProperty
    public void setCollection(BiodiversityCollection collection) {
        this.collection = collection;
    }

    public Set<String> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<String> authors) {
        this.authors = authors;
    }

    public Attachment getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }
}