package com.unep.wcmc.biodiversity.model;

import com.unep.wcmc.biodiversity.support.BaseEntity;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Entity
public class ForgetPasswordToken implements BaseEntity {
	
	private static final int TIMEOUT = 60 * 24;   // one day
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column
    private String token;
    @Column
    private Date expiryDate;
    @Column
    private String urlCallback;
    
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "userId")
    private User user;
    
    public ForgetPasswordToken() {
    }
 
    public ForgetPasswordToken(String token, String urlCallback, User user) {
    	this.token = token;
    	this.user = user;
    	this.urlCallback = urlCallback;
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

	private void createExpiryDate() {
    	final Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(calendar.getTimeInMillis());
        calendar.add(Calendar.MINUTE, TIMEOUT);
        expiryDate = calendar.getTime();
    }
}
