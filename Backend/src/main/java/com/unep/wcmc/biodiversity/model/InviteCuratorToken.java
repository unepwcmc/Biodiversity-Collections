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

	private String institution;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "userId")
    private User user;

    public InviteCuratorToken() {
    }

    public InviteCuratorToken(String token, String urlCallback, User user, String curatorEmail, String institution) {
    	this.token = token;
    	this.user = user;
    	this.urlCallback = urlCallback;
		this.curatorEmail = curatorEmail;
		this.institution = institution;
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

	public User getUser() {
		return user;
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

	public void setUser(User user) {
		this.user = user;
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

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	private void createExpiryDate() {
    	final Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(calendar.getTimeInMillis());
        calendar.add(Calendar.MINUTE, TIMEOUT);
        expiryDate = calendar.getTime();
    }
}
