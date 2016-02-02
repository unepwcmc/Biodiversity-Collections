package com.unep.wcmc.biodiversity.model;

import java.io.Serializable;

public class InstitutionSummary implements Serializable {

    private Institution institution;
    private Long institutionTotal;
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

    public InstitutionSummary(Long id, String name, String address1, String address2, String address3,
                              String city, String district, String country, InstitutionType type,
                              Long collections, Long specimens, Long faunaCollections,
                              Long floraCollections, Long microorganismsCollections, Long otherCollections,
                              Long fungiCollections) {
        Contact contact = new Contact(country, city, district, address3, address2, address1);
        this.institution = new Institution(id, name, contact, type);
        this.collections = collections;
        this.specimens = specimens;
        this.faunaCollections = faunaCollections;
        this.floraCollections = floraCollections;
        this.microorganismsCollections = microorganismsCollections;
        this.otherCollections = otherCollections;
        this.fungiCollections = fungiCollections;
    }

    public InstitutionSummary(Long institutionTotal, Long collections, Long specimens, Long faunaCollections,
                              Long floraCollections, Long microorganismsCollections, Long otherCollections,
                              Long fungiCollections) {
        this.institutionTotal = institutionTotal;
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

    public Long getInstitutionTotal() {
        return institutionTotal;
    }

    public void setInstitutionTotal(Long institutionTotal) {
        this.institutionTotal = institutionTotal;
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
