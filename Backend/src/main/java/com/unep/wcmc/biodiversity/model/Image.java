package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;

@Entity
public class Image implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "file_id")
    @RestResource(exported = false)
    private Attachment attachment;

    public Image(){}

    public Image(MultipartFile file) {
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Attachment getAttachment() {
        return attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }
}
