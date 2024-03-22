package com.example.Project310.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;


	private String firstName;
	private String lastName;
	private String birthDay;
	private String ssn;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "member")
	private List<Book> books;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "member")
	private AppUser appUser;

	public Member(String firsName, String lastName, String birthDay, String ssn) {
		super();
		this.firstName = firsName;
		this.lastName = lastName;
		this.birthDay = birthDay;
		this.ssn = ssn;
	}

	public Member() {
	
	}

	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firsName) {
		this.firstName = firsName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(String birthDay) {
		this.birthDay = birthDay;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

}
