package com.example.Project310.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String firsName;
	private String lastName;
	private String birthDay;
	private String SSN;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "member")
	private List<Book> books;

	public Member(String firsName, String lastName, String birthDay, String SSN) {
		super();
		this.firsName = firsName;
		this.lastName = lastName;
		this.birthDay = birthDay;
		this.SSN = SSN;
	}
	

	public Member() {
		super();
	}


	public long getId() {
		return id;
	}

	public String getFirsName() {
		return firsName;
	}

	public void setFirsName(String firsName) {
		this.firsName = firsName;
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

	public String getSSN() {
		return SSN;
	}

	public void setSSN(String sSN) {
		SSN = sSN;
	}

}
