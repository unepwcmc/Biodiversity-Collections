package com.unep.wcmc.biodiversity.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class Specimen implements Serializable {

    private String type;

    @Column(name = "specimen_count")
    private Long count;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Specimen)) return false;

        Specimen specimen = (Specimen) o;

        if (type != null ? !type.equals(specimen.type) : specimen.type != null) return false;
        return !(count != null ? !count.equals(specimen.count) : specimen.count != null);

    }

    @Override
    public int hashCode() {
        int result = type != null ? type.hashCode() : 0;
        result = 31 * result + (count != null ? count.hashCode() : 0);
        return result;
    }
}