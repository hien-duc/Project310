package com.example.Project310;

import com.example.Project310.model.*;
import com.example.Project310.repositories.AppUserRepository;
import com.example.Project310.repositories.AuthorRepository;
import com.example.Project310.repositories.BookRepository;
import com.example.Project310.repositories.MemberRepository;
import com.example.Project310.repositories.RentalRepository;

import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication()
@ComponentScan("com.example.Project310.repository")
public class Project310Application implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(Project310Application.class);
	private final BookRepository bookRepository;
	private final AuthorRepository authorRepository;
	private final MemberRepository memberRepository;
	private final RentalRepository rentalRepository;
	private final AppUserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(Project310Application.class, args);
	}

	public Project310Application(BookRepository bookRepository, AuthorRepository authorRepository,
			MemberRepository memberRepository, RentalRepository rentalRepository, AppUserRepository urepository) {
		this.bookRepository = bookRepository;
		this.authorRepository = authorRepository;
		this.memberRepository = memberRepository;
		this.rentalRepository = rentalRepository;
		this.urepository = urepository;
	}

	@SuppressWarnings("null")
	@Override
	public void run(String... args) throws Exception {
		Author authors = new Author("cog", "hehe", "minh");
		Author authors2 = new Author("2222", "22222", "minh");
		authorRepository.saveAll(Arrays.asList(authors, authors2));

		for (Book books : this.bookRepository.findAll()) {
			logger.info(books.toString());
		}
		urepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
		// Username: admin, password: admin
		urepository.save(new AppUser("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}
}
