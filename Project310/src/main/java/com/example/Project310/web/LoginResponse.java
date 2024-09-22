//package com.example.Project310.web;
//
//import java.util.List;
//import java.util.Optional;
//
//import com.example.Project310.model.AppUser;
//import com.example.Project310.model.Book;
//import com.example.Project310.model.Member;
//
//public class LoginResponse {
//	private String token;
//	private Optional<AppUser> appUser;
//	private Member member;
//	private List<Book> book;
//
//	public LoginResponse(String token, Optional<AppUser> appUser, Member member, List<Book> book) {
//		this.token = token;
//		this.appUser = appUser;
//		this.member = member;
//		this.book = book;
//	}
//
//	public String getToken() {
//		return token;
//	}
//
//	public void setToken(String token) {
//		this.token = token;
//	}
//
//	public Optional<AppUser> getAppUser() {
//		return appUser;
//	}
//
//	public void setAppUser(Optional<AppUser> appUser) {
//		this.appUser = appUser;
//	}
//
//	public Member getMember() {
//		return member;
//	}
//
//	public void setMember(Member member) {
//		this.member = member;
//	}
//
//	public List<Book> getBook() {
//		return book;
//	}
//
//	public void setBook(List<Book> book) {
//		this.book = book;
//	}
//
//}
