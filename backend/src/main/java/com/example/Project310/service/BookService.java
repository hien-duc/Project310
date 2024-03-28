//package com.example.Project310.service;
//
//import com.example.Project310.model.Book;
//import com.example.Project310.repositories.BookRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//public class BookService {
//
//	private final BookRepository bookRepository;
//
//	public BookService(BookRepository bookRepository) {
//		this.bookRepository = bookRepository;
//	}
//
//	@Transactional(readOnly = true)
//	public List<Book> getAllBooksFetchRelatedEntities() {
//		// Fetch all books with eager loading of related entities
//		List<Book> books = bookRepository.findAllWithEagerRelationships();
//		return books;
//	}
//}
