package com.example.Project310.model;

import jakarta.persistence.*;

@Entity
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String tiltle;
	private String totalPages;
	private long rating;
	private String publishesDate;
	private String ISBNNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "author")
	private Author author;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member")
	private Member member;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "rental")
	private Rental rental;

	public Book(String tiltle, String totalPages, long rating, String publishesDate, String ISBNNumber, Author authors,
			Rental rental) {
		super();
		this.tiltle = tiltle;
		this.totalPages = totalPages;
		this.rating = rating;
		this.publishesDate = publishesDate;
		this.ISBNNumber = ISBNNumber;
		this.author = authors;
		this.rental = rental;
	}

	public Book() {
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

	public String getTiltle() {
		return tiltle;
	}

	public long getId() {
		return id;
	}

	public void setTiltle(String tiltle) {
		this.tiltle = tiltle;
	}

	public String getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(String totalPages) {
		this.totalPages = totalPages;
	}

	public long getRating() {
		return rating;
	}

	public void setRating(long rating) {
		this.rating = rating;
	}

	public String getPublishesDate() {
		return publishesDate;
	}

	public void setPublishesDate(String publishesDate) {
		this.publishesDate = publishesDate;
	}
}
