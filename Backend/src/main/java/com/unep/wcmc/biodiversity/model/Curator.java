package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Curator implements BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String jobTitle;

    private Date dateOfBirth;

    private String areaOfResponsibility;

    @Column(columnDefinition = "TEXT")
    private String researchDiscipline;

    @Column(columnDefinition = "TEXT")
    private String researchSpeciality;

    @Embedded
    private Contact contact;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @ManyToMany
    @JoinTable(name = "curator_institution",
            joinColumns = @JoinColumn(name = "curator_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id"))
    private Set<Institution> associatedInstitutions;

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

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getAreaOfResponsibility() {
        return areaOfResponsibility;
    }

    public void setAreaOfResponsibility(String areaOfResponsibility) {
        this.areaOfResponsibility = areaOfResponsibility;
    }

    public String getResearchDiscipline() {
        return researchDiscipline;
    }

    public void setResearchDiscipline(String researchDiscipline) {
        this.researchDiscipline = researchDiscipline;
    }

    public String getResearchSpeciality() {
        return researchSpeciality;
    }

    public void setResearchSpeciality(String researchSpeciality) {
        this.researchSpeciality = researchSpeciality;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public Set<Institution> getAssociatedInstitutions() {
        return associatedInstitutions;
    }

    public void setAssociatedInstitutions(Set<Institution> associatedInstitutions) {
        this.associatedInstitutions = associatedInstitutions;
    }
}