package com.example.Project310;

import com.example.Project310.model.*;
import com.example.Project310.repositories.AuthorsRepository;
import com.example.Project310.repositories.BooksRepository;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.example.Project310.repository")
public class Project310Application implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(Project310Application.class);
	private final BooksRepository bookRepository;
	private final AuthorsRepository authorRepository;

	public static void main(String[] args) {
		SpringApplication.run(Project310Application.class, args);
	}

	public Project310Application(BooksRepository bookRepository, AuthorsRepository authorRepository) {
		this.bookRepository = bookRepository;
		this.authorRepository = authorRepository;
	}

	@SuppressWarnings("null")
	@Override
	public void run(String... args) throws Exception {
		Author authors = new Author("cog", "hehe", "minh");
		Author authors2 = new Author("2222", "22222", "minh");
		authorRepository.saveAll(Arrays.asList(authors, authors2));

//		bookRepository.save(new Book("name", "name", 0, "name", "íbn", authors, new Rental("a", "b", "c", "d")));
//		bookRepository.save(new Book("name", "name", 0, "name", "íbn", authors, new Rental("a", "b", "c", "d")));
//		bookRepository.save(new Book("name", "name", 0, "name", "íbn", authors2, null));

		for (Book books : this.bookRepository.findAll()) {
			logger.info(books.toString());
		}
	}
}
