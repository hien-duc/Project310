package com.example.Project310;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.Project310.model.AppUser;
import com.example.Project310.model.Author;
import com.example.Project310.model.Book;
import com.example.Project310.repositories.AppUserRepository;
import com.example.Project310.repositories.AuthorRepository;
import com.example.Project310.repositories.BookRepository;
import com.example.Project310.repositories.MemberRepository;
import com.example.Project310.repositories.RentalRepository;

@SpringBootApplication()
@ComponentScan("com.example.Project310")
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

	@Override
	public void run(String... args) throws Exception {

		Author authors = new Author("cog", "hehe", "minh");


		Author authors1 = new Author("aaa", "bbb", "ccc");
		Author authors2 = new Author("ddd", "eee", "fff");

		authorRepository.saveAll(Arrays.asList(authors, authors2));

		for (Book books : this.bookRepository.findAll()) {
			logger.info(books.toString());
		}
		// Username: user, password: user
		urepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
		// Username: admin, password: admin
		urepository.save(new AppUser("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
		urepository.save(new AppUser("duc", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}
	public static List<Book> generateBooks() {
        List<Book> books = new ArrayList<>();

        books.add(new Book("Moby-Dick", "459", (long) 3.3, "1966-08-17", "0174619147260", null, null));
        books.add(new Book("Alice's Adventures in Wonderland", "466", (long) 4.9, "1943-11-23", "5346643770632", null, null));
        books.add(new Book("The Hobbit", "281", (long) 4.6, "2016-01-19", "4668599825457", null, null));
        books.add(new Book("Harry Potter and the Sorcerer's Stone", "351", (long)3.6, "1976-05-09", "9764810591553", null, null));
        books.add(new Book("The Catcher in the Rye", "302", (long)4.3, "1995-08-28", "0278789674588", null, null));
        books.add(new Book("1984", "424", 4.4, "1997-08-18", "6694335191156", null, null));
        books.add(new Book("Harry Potter and the Sorcerer's Stone", "173", 4.9, "1970-07-20", "9395143909646", null, null));
        books.add(new Book("The Catcher in the Rye", "268", 4.1, "1944-05-07", "3735246707424", null, null));
        books.add(new Book("Harry Potter and the Sorcerer's Stone", "341", 3.2, "1973-07-28", "1672196721504", null, null));
        books.add(new Book("Pride and Prejudice", "319", 4.3, "2014-05-02", "4440904917904", null, null));

        return books;
    }
}
