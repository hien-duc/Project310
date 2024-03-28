package com.example.Project310.model;

import jakarta.persistence.*;

@Entity
public class Rental {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String memberId;
	private String bookId;
	private String dueDate;
	private String rentDate;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "rental")
	private Book books;

	public Rental(String memberId, String bookId, String dueDate, String rentDate) {
		super();
		this.memberId = memberId;
		this.bookId = bookId;
		this.dueDate = dueDate;
		this.rentDate = rentDate;
	}

	public Rental() {
	}
	

	public Long getId() {
		return id;
	}

	public Book getBooks() {
		return books;
	}

	public void setBooks(Book books) {
		this.books = books;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getRentDate() {
		return rentDate;
	}

	public void setRentDate(String rentDate) {
		this.rentDate = rentDate;
	}
}
