package com.example.Project310;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.Project310.model.AppUser;
import com.example.Project310.model.Author;
import com.example.Project310.model.Book;
import com.example.Project310.model.Member;
import com.example.Project310.model.Rental;
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

	@SuppressWarnings("null")
	@Override
	public void run(String... args) throws Exception {

		List<Author> authors = generateAuthors();
		List<Member> members = generateMembers();
		List<Rental> rentals = generateRentals();

		List<Book> books = new ArrayList<>();

		String[] titles = { "Moby-Dick", "Alice's Adventures in Wonderland", "The Hobbit",
				"Harry Potter and the Sorcerer's Stone", "The 																																																																																						Catcher in the Rye", "1984", "Pride and Prejudice",
				"To Kill a Mockingbird", "The Great Gatsby", "The Lord of the Rings" };
		String[] totalPages1 = { "459", "466", "281", "351", "302", "424", "319", "281", "218", "352" };
		double[] ratings = { 3.3, 4.9, 4.6, 3.6, 4.3, 4.4, 4.3, 4.5, 4.2, 4.7 };
		String[] publishesDates = { "1966-08-17", "1943-11-23", "2016-01-19", "1976-05-09", "1995-08-28", "1997-08-18",
				"2014-05-02", "1960-07-11", "1925-04-10", "1954-07-29" };
		String[] ISBNNumbers = { "0174619147260", "5346643770632", "4668599825457", "9764810591553", "0278789674588",
				"6694335191156", "4440904917904", "7597465542487", "7540987241634", "2780536617382" };

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			String title = titles[i];
			String totalPages = totalPages1[i];
			double rating = ratings[i];
			String publishesDate = publishesDates[i];
			String ISBNNumber = ISBNNumbers[i];
			Author author = authors.get(random.nextInt(authors.size()));
			authorRepository.save(author);
			Member member = members.get(random.nextInt(members.size()));
			memberRepository.save(member);
			Rental rental = rentals.get(i);
			rentalRepository.save(rental);

			Book book = new Book(title, totalPages, rating, publishesDate, ISBNNumber, author, rental, member);
			bookRepository.save(book);
		}

//
//		List<Book> books = generateBooks(authors, rentals, members);
		bookRepository.saveAll(books);

		// Save user data
		urepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
		urepository.save(new AppUser("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}

	public List<Book> generateBooks(List<Author> authors, List<Rental> rentals, List<Member> members) {
		List<Book> books = new ArrayList<>();

		String[] titles = { "Moby-Dick", "Alice's Adventures in Wonderland", "The Hobbit",
				"Harry Potter and the Sorcerer's Stone", "The Catcher in the Rye", "1984", "Pride and Prejudice",
				"To Kill a Mockingbird", "The Great Gatsby", "The Lord of the Rings" };

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			String title = titles[i];
			Author author = authors.get(random.nextInt(authors.size()));
//			Member member = members.get(random.nextInt(members.size()));
			Rental rental = rentals.get(random.nextInt(rentals.size()));

//			Book book = new Book(title, "Some total pages", 0.0, "Some date", "Some ISBN", null, null);
//			books.add(book);
		}

		return books;
	}

	public static List<Author> generateAuthors() {
		List<Author> authors = new ArrayList<>();

		String[] firstNames = { "John", "Emily", "Michael", "Sarah", "David", "Emma", "Daniel", "Olivia", "Matthew",
				"Sophia" };
		String[] middleNames = { "James", "Elizabeth", "Christopher", "Anne", "Andrew", "Grace", "Ryan", "Madison",
				"Thomas", "Ava" };
		String[] lastNames = { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
				"Rodriguez", "Martinez" };

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			String firstName = firstNames[random.nextInt(firstNames.length)];
			String middleName = middleNames[random.nextInt(middleNames.length)];
			String lastName = lastNames[random.nextInt(lastNames.length)];

			authors.add(new Author(firstName, middleName, lastName));
		}

		return authors;
	}

	public static List<Member> generateMembers() {
		List<Member> members = new ArrayList<>();

		String[] firstNames = { "John", "Emily", "Michael", "Sarah", "David", "Emma", "Daniel", "Olivia", "Matthew",
				"Sophia" };
		String[] lastNames = { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
				"Rodriguez", "Martinez" };
		String[] birthdays = { "1990-01-01", "1985-05-10", "1988-11-15", "1992-03-20", "1983-09-25", "1995-07-08",
				"1987-12-30", "1998-04-18", "1989-06-05", "1993-02-14" };
		String[] SSNs = { "123-45-6789", "234-56-7890", "345-67-8901", "456-78-9012", "567-89-0123", "678-90-1234",
				"789-01-2345", "890-12-3456", "901-23-4567", "012-34-5678" };

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			String firstName = firstNames[random.nextInt(firstNames.length)];
			String lastName = lastNames[random.nextInt(lastNames.length)];
			String birthDay = birthdays[random.nextInt(birthdays.length)];
			String SSN = SSNs[random.nextInt(SSNs.length)];

			members.add(new Member(firstName, lastName, birthDay, SSN));
		}

		return members;
	}

	public static List<Rental> generateRentals() {
		List<Rental> rentals = new ArrayList<>();

		String[] memberIds = { "M001", "M002", "M003", "M004", "M005", "M006", "M007", "M008", "M009", "M010" };
		String[] bookIds = { "B001", "B002", "B003", "B004", "B005", "B006", "B007", "B008", "B009", "B010" };
		String[] dueDates = { "2024-03-20", "2024-03-25", "2024-03-30", "2024-04-05", "2024-04-10", "2024-04-15",
				"2024-04-20", "2024-04-25", "2024-05-01", "2024-05-05" };
		String[] rentDates = { "2024-03-10", "2024-03-15", "2024-03-20", "2024-03-25", "2024-03-30", "2024-04-05",
				"2024-04-10", "2024-04-15", "2024-04-20", "2024-04-25" };

		Random random = new Random();

		for (int i = 0; i < 10; i++) {
			String memberId = memberIds[random.nextInt(memberIds.length)];
			String bookId = bookIds[random.nextInt(bookIds.length)];
			String dueDate = dueDates[random.nextInt(dueDates.length)];
			String rentDate = rentDates[random.nextInt(rentDates.length)];

			rentals.add(new Rental(memberId, bookId, dueDate, rentDate));
		}

		return rentals;
	}
}
