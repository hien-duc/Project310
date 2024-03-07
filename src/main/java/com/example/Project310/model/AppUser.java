package com.example.Project310.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class AppUser {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, unique = true, updatable = false)

  private long id;
  @Column(nullable = false, unique = true)

  private String username;
  @Column(nullable = false)

  private String password;
  @Column(nullable = false)

  private String role;

  public AppUser(String username, String password, String role) {
    super();
    this.username = username;
    this.password = password;
    this.role = role;
  }
  
  

  public AppUser() {
	super();
}



public long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
		this.role = role;
	}

}
