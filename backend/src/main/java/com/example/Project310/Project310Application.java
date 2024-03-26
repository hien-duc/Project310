package com.example.Project310;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

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
	private static final Random random = new Random();

	private static final String[] FIRST_NAMES = { "John", "Alice", "Michael", "Emma", "William", "Olivia" };
	private static final String[] LAST_NAMES = { "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia" };
	private static final String[] MIDDLE_NAMES = { "James", "Mary", "Robert", "Patricia", "David", "Linda" };
	private static final String[] TITLES = { "The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice",
			"The Catcher in the Rye" };
	private static final String[] ISBNS = { "9780142437209", "9780446310789", "9780451524935", "9780141187761",
			"9780316769488" };
	private static final double[] RATINGS = { 4.5, 4.3, 4.8, 4.1, 4.7 };
	private static final String[] PUBLISH_DATES = { "01/01/2000", "05/12/1995", "10/22/2010", "03/30/1980",
			"07/17/2005" };
	private static final String[] BIRTH_DATES = { "05/18/1988", "12/03/1992", "09/25/1985", "03/10/1990",
			"11/05/1976" };
	private static final String[] SSNS = { "123-45-6789", "234-56-7890", "345-67-8901", "456-78-9012", "567-89-0123" };
	private static final String[] MEMBER_IDS = { "M123", "M456", "M789", "M012", "M345" };
	private static final String[] BOOK_IDS = { "B123", "B456", "B789", "B012", "B345" };
	private static final String[] DUE_DATES = { "04/30/2024", "05/15/2024", "06/10/2024", "07/05/2024", "08/20/2024" };
	private static final String[] RENT_DATES = { "03/30/2024", "04/15/2024", "05/10/2024", "06/05/2024", "07/20/2024" };
	private static final String[] USERNAMES = { "user1", "user2", "user3", "user4", "user5" };
	private static final String[] PASSWORDS = { "password1", "password2", "password3", "password4", "password5" };
	private static final String[] ROLES = { "USER", "ADMIN" };

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

		List<Author> authors = generateAuthors(20);
		List<Member> members = generateMembers(20);
		List<Book> books = generateBooks(20, authors, members);
		List<Rental> rentals = generateRentals(20, members, bookRepository);
		List<AppUser> appUsers = generateAppUsers(20, members);
		// Save generated data to the database
		authorRepository.saveAll(authors);
		memberRepository.saveAll(members);
		bookRepository.saveAll(books);
		rentalRepository.saveAll(rentals);
		urepository.saveAll(appUsers);

		// Print generated data for verification
		System.out.println("Authors:");
		authors.forEach(System.out::println);
		System.out.println("\nMembers:");
		members.forEach(System.out::println);
		System.out.println("\nBooks:");
		books.forEach(System.out::println);
		System.out.println("\nRentals:");
		rentals.forEach(System.out::println);

	}

	public static List<AppUser> generateAppUsers(int count, List<Member> members) {
		List<AppUser> appUsers = new ArrayList<>();
		List<Member> shuffledMembers = new ArrayList<>(members);
	
		Collections.shuffle(shuffledMembers);
		for (int i = 0; i < count; i++) {
			String username = USERNAMES[random.nextInt(USERNAMES.length)];
			String password = PASSWORDS[random.nextInt(PASSWORDS.length)];
			String role = ROLES[random.nextInt(ROLES.length)];
			Member member = shuffledMembers.get(i);
			appUsers.add(new AppUser(username, password, role, member));
		}
		return appUsers;
	}

	public static List<Author> generateAuthors(int count) {
		List<Author> authors = new ArrayList<>();
		for (int i = 0; i < count; i++) {
			String firstName = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
			String middleName = MIDDLE_NAMES[random.nextInt(MIDDLE_NAMES.length)];
			String lastName = LAST_NAMES[random.nextInt(LAST_NAMES.length)];
			authors.add(new Author(firstName, middleName, lastName));
		}
		return authors;
	}

	public static List<Member> generateMembers(int count) {
		List<Member> members = new ArrayList<>();
		for (int i = 0; i < count; i++) {
			String firstName = FIRST_NAMES[random.nextInt(FIRST_NAMES.length)];
			String lastName = LAST_NAMES[random.nextInt(LAST_NAMES.length)];
			String birthDate = BIRTH_DATES[random.nextInt(BIRTH_DATES.length)];
			String ssn = SSNS[random.nextInt(SSNS.length)];
			members.add(new Member(firstName, lastName, birthDate, ssn));
		}
		return members;
	}

	public static List<Book> generateBooks(int count, List<Author> authors, List<Member> members) {
		List<Book> books = new ArrayList<>();
		for (int i = 0; i < count; i++) {
			String title = TITLES[random.nextInt(TITLES.length)];
			String totalPages = String.valueOf(random.nextInt(500) + 100); // Random number between 100 and 600
			double rating = RATINGS[random.nextInt(RATINGS.length)];
			String publishesDate = PUBLISH_DATES[random.nextInt(PUBLISH_DATES.length)];
			double price = Math.round(random.nextDouble() * 300);
			String isbnNumber = ISBNS[random.nextInt(ISBNS.length)];
			Author author = authors.get(random.nextInt(authors.size()));
			Member member = members.get(random.nextInt(members.size()));
			books.add(new Book(title, totalPages, rating, publishesDate, price, isbnNumber, author, null, member));
		}
		return books;
	}

	public static List<Rental> generateRentals(int count, List<Member> members, BookRepository bookRepository) {
		List<Rental> rentals = new ArrayList<>();
		for (int i = 0; i < count; i++) {
			String memberId = MEMBER_IDS[random.nextInt(MEMBER_IDS.length)];
			String dueDate = DUE_DATES[random.nextInt(DUE_DATES.length)];
			String rentDate = RENT_DATES[random.nextInt(RENT_DATES.length)];

			// Fetch a random book from the database
			Optional<Book> optionalBook = bookRepository.findById(random.nextLong());
			if (optionalBook.isPresent()) {
				Book book = optionalBook.get();
				Rental rental = new Rental(memberId, memberId, dueDate, rentDate);
				rental.setBooks(book);
				rentals.add(rental);
			}
		}
		return rentals;
	}

}
