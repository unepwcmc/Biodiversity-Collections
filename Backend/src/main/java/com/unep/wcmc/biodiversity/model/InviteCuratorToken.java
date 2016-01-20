package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Entity
public class InviteCuratorToken implements BaseEntity {

	private static final int TIMEOUT = 60 * 24;   // one day

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;

    private String urlCallback;

	private String curatorEmail;

	@ManyToOne
	@JoinColumn(name = "institution_id")
	private Institution institution;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(nullable = true, name = "curator_id")
	private Curator curator;

	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = true, name = "user_id")
	private User user;

    public InviteCuratorToken() {
    }

    public InviteCuratorToken(String token, String urlCallback, Curator curator, String curatorEmail) {
    	this.token = token;
    	this.curator = curator;
    	this.urlCallback = urlCallback;
		this.curatorEmail = curatorEmail;
    	createExpiryDate();
    }

    @Override
    public Long getId() {
		return id;
	}

	public String getToken() {
		return token;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	@Override
	public void setId(Long id) {
		this.id = id;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
    
    public String getUrlCallback() {
		return urlCallback;
	}

	public void setUrlCallback(String urlCallback) {
		this.urlCallback = urlCallback;
	}

	public String getCuratorEmail() {
		return curatorEmail;
	}

	public void setCuratorEmail(String curatorEmail) {
		this.curatorEmail = curatorEmail;
	}

	public Institution getInstitution() {
		return institution;
	}

	public void setInstitution(Institution institution) {
		this.institution = institution;
	}

	public Curator getCurator() {
		return curator;
	}

	public void setCurator(Curator curator) {
		this.curator = curator;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	private void createExpiryDate() {
    	final Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(calendar.getTimeInMillis());
        calendar.add(Calendar.MINUTE, TIMEOUT);
        expiryDate = calendar.getTime();
    }
}
