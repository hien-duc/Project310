package com.example.Project310.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private String isbnnumber;
	private double quantity;
	private double price;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "author_id")
	@JsonIgnore
	private Author author;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnore
	private Member member;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.REMOVE, CascadeType.REFRESH,
			CascadeType.DETACH }, fetch = FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "rental_id")
	private Rental rental;

	

	public Book(String title, String totalPages, double rating, String publishesDate, double price, String isbnnumber,
			double quantity, Author author, Member member, Rental rental) {
		super();
		this.title = title;
		this.totalPages = totalPages;
		this.rating = rating;
		this.publishesDate = publishesDate;
		this.isbnnumber = isbnnumber;
		this.quantity = quantity;
		this.price = price;
		this.author = author;
		this.member = member;
		this.rental = rental;
	}

	public Book() {
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public String getIsbnnumber() {
		return isbnnumber;
	}

	public void setIsbnnumber(String isbnnumber) {
		this.isbnnumber = isbnnumber;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
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
