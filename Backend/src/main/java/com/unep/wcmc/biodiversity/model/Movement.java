package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Movement implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    @ManyToOne
    @JoinColumn(name = "institution_from_id")
    private Institution from;

    @ManyToOne
    @JoinColumn(name = "institution_to_id")
    private Institution to;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    private boolean status;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Institution getFrom() {
        return from;
    }

    public void setFrom(Institution from) {
        this.from = from;
    }

    public Institution getTo() {
        return to;
    }

    public void setTo(Institution to) {
        this.to = to;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
