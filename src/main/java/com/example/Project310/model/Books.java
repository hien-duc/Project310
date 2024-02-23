package com.example.Project310.model;

import jakarta.persistence.*;

@Entity
public class Books {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String tiltle;
	private String totalPages;
	private long rating;
	private String publishesDate;

	public Books(String tiltle, String totalPages, long rating, String publishesDate) {
		super();
		this.tiltle = tiltle;
		this.totalPages = totalPages;
		this.rating = rating;
		this.publishesDate = publishesDate;
	}

	public Books() {

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
