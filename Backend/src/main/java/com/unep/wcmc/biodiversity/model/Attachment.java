package com.unep.wcmc.biodiversity.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"file"})
public class Attachment implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="file")
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] file;

    public Attachment(){
    }

    public Attachment(byte[] bytes) {
        setFile(bytes);
    }

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }
}
