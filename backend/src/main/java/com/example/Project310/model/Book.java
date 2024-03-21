package com.example.Project310.model;

import jakarta.persistence.*;

@Entity
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;
	private String totalPages;
	private double rating;
	private String publishesDate;
	private String ISBNNumber;

	@ManyToOne(fetch = FetchType.EAGER)
<<<<<<< HEAD
	@JoinColumn(name = "author")
	private Author author;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member")
=======
	@JoinColumn(name = "author_id")
	private Author author;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
>>>>>>> Minh
	private Member member;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH,
			CascadeType.DETACH }, fetch = FetchType.EAGER)
	@JoinColumn(name = "rental_id")
	private Rental rental;

<<<<<<< HEAD
	public Book(String title, String totalPages, double rating, String publishesDate, String ISBNNumber, Author authors,
=======
	public Book(String title, String totalPages, double rating, String publishesDate, String ISBNNumber, Author author,
>>>>>>> Minh
			Rental rental, Member member) {
		super();
		this.title = title;
		this.totalPages = totalPages;
		this.rating = rating;
		this.publishesDate = publishesDate;
		this.ISBNNumber = ISBNNumber;
		this.author = author;
		this.rental = rental;
		this.member = member;

	}

	public Book() {
	}
	
	

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Rental getRental() {
		return rental;
	}

	public void setRental(Rental rental) {
		this.rental = rental;
	}

	public Author getAuthors() {
		return author;
	}

	public void setAuthors(Author authors) {
		this.author = authors;
	}

	public String getISBNNumber() {
		return ISBNNumber;
	}

	public void setISBNNumber(String iSBNNumber) {
		ISBNNumber = iSBNNumber;
	}

	public String getTitle() {
		return title;
	}

	public long getId() {
		return id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(String totalPages) {
		this.totalPages = totalPages;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getPublishesDate() {
		return publishesDate;
	}

	public void setPublishesDate(String publishesDate) {
		this.publishesDate = publishesDate;
	}
}
