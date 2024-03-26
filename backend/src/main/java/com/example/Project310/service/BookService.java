package com.example.Project310.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Project310.model.Book;
import com.example.Project310.model.Member;
import com.example.Project310.repositories.BookRepository;

@Service
public class BookService {

	private final BookRepository bookRepository;

	@Autowired
	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public List<Book> getBooksForMember(Member member) {
		return bookRepository.findByMember(member);
	}
}
