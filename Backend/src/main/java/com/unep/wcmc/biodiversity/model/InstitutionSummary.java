package com.unep.wcmc.biodiversity.model;

import java.io.Serializable;

public class InstitutionSummary implements Serializable {

    private Institution institution;
    private Long collections;
    private Long specimens;
    private Long faunaCollections;
    private Long floraCollections;
    private Long microorganismsCollections;
    private Long otherCollections;
    private Long fungiCollections;

    public InstitutionSummary() {
        super();
    }

    public InstitutionSummary(Institution institution, Long collections, Long specimens, Long faunaCollections,
                              Long floraCollections, Long microorganismsCollections, Long otherCollections,
                              Long fungiCollections) {
        this.institution = institution;
        this.collections = collections;
        this.specimens = specimens;
        this.faunaCollections = faunaCollections;
        this.floraCollections = floraCollections;
        this.microorganismsCollections = microorganismsCollections;
        this.otherCollections = otherCollections;
        this.fungiCollections = fungiCollections;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public Long getCollections() {
        return collections;
    }

    public void setCollections(Long collections) {
        this.collections = collections;
    }

    public Long getSpecimens() {
        return specimens;
    }

    public void setSpecimens(Long specimens) {
        this.specimens = specimens;
    }

    public Long getFaunaCollections() {
        return faunaCollections;
    }

    public void setFaunaCollections(Long faunaCollections) {
        this.faunaCollections = faunaCollections;
    }

    public Long getFloraCollections() {
        return floraCollections;
    }

    public void setFloraCollections(Long floraCollections) {
        this.floraCollections = floraCollections;
    }

    public Long getMicroorganismsCollections() {
        return microorganismsCollections;
    }

    public void setMicroorganismsCollections(Long microorganismsCollections) {
        this.microorganismsCollections = microorganismsCollections;
    }

    public Long getOtherCollections() {
        return otherCollections;
    }

    public void setOtherCollections(Long otherCollections) {
        this.otherCollections = otherCollections;
    }

    public Long getFungiCollections() {
        return fungiCollections;
    }

    public void setFungiCollections(Long fungiCollections) {
        this.fungiCollections = fungiCollections;
    }
}
