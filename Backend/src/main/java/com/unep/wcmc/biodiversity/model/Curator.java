package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedEntityGraph(name = "Curator.detail",
        attributeNodes = {
                @NamedAttributeNode("associatedInstitutions"),
                @NamedAttributeNode(value = "user", subgraph = "user")
        },
        subgraphs = @NamedSubgraph(name = "user", attributeNodes = @NamedAttributeNode("institution"))
)
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

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToMany
    @JoinTable(name = "curator_institution",
            joinColumns = @JoinColumn(name = "curator_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id"))
    private Set<Institution> associatedInstitutions;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = true, name = "user_id")
    private User user;

    @OneToMany(mappedBy = "curator")
    private Set<BiodiversityCollection> collections;

    @OneToMany(mappedBy = "curator", cascade = CascadeType.REMOVE)
    private Set<InviteCuratorToken> tokens;

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

    public Set<Institution> getAssociatedInstitutions() {
        if (this.associatedInstitutions == null) {
            this.associatedInstitutions = new HashSet<>();
        }
        return this.associatedInstitutions;
    }

    public void setAssociatedInstitutions(Set<Institution> associatedInstitutions) {
        this.associatedInstitutions = associatedInstitutions;
    }

    public void addAssociatedInstitution(Institution institution){
        getAssociatedInstitutions().add(institution);
    }

    public void removeAssociatedInstitution(Institution institution){
        getAssociatedInstitutions().remove(institution);
    }

    public Set<BiodiversityCollection> getCollections() {
        return collections;
    }

    public void setCollections(Set<BiodiversityCollection> collections) {
        this.collections = collections;
    }

    public Set<InviteCuratorToken> getTokens() {
        return tokens;
    }

    public void setTokens(Set<InviteCuratorToken> tokens) {
        this.tokens = tokens;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}