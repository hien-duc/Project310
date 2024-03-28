package com.example.Project310;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.hibernate.Hibernate;
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
			"The Catcher in the Rye", "The Language of Rain", "We Are Powerful", "One Way Ride", "Dragon Invasion",
			"One Car And The Road", "Stormweaver’s Saga", "Yesterday is Today", "Innocent Eyes", "Behind the Door",
			"Beyond the Horizon", "Whispers of the Waning Moon", "Slay Like a Princess", "The Lost Portrait",
			"Heart Me", "Christmas Turtle", "One Way Ride" };
	private static final String[] ISBNS = { "9780142437209", "9780446310789", "9780451524935", "9780141187761",
			"9780316769488", "9781142437209", "9782446310789", "	9780421524935", "9782141187761", "9780316769288",
			"9780122437209", "9780446312289", "9780451524925", "9780141187721", "9780316769428", "9782242437209",
			"9780446312289", "9780451524225", "9780141187722", "9780322769488", };
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
	private static final String[] USERNAMES = { "user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8",
			"user9", "user10", "user11", "user12", "user13", "user14", "user15", "user16", "user17", "user18", "user19",
			"user20" };
	private static final String[] PASSWORDS = { "password1", "password2", "password3", "password4", "password5",
			"password6", "password7", "password8", "password9", "password10", "password11", "password12", "password13",
			"password14", "password15", "password16", "password17", "password18", "password19", "password20" };
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
		List<Rental> rentals = generateRentals(20, members);
		List<Book> books = generateBooks(20, authors, members, rentals, rentalRepository);

		List<AppUser> appUsers = generateAppUsers(20, members);
		// Save generated data to the database
		authorRepository.saveAll(authors);
		memberRepository.saveAll(members);
//		rentalRepository.saveAll(rentals);
		urepository.saveAll(appUsers);
		bookRepository.saveAll(books);

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
		List<String> shuffledUsernames = Arrays.asList(USERNAMES);

		Collections.shuffle(shuffledMembers);
//		Collections.shuffle(shuffledUsernames);

		Member member = shuffledMembers.get(0);
		Member member1 = shuffledMembers.get(1);
		appUsers.add(
				new AppUser("user", "$2a$12$Q62s4GxCBo3mImlAub.0ruqxFQf6RySDJuWGTeBFN3QYC6tkY42.q", "USER", member));
		appUsers.add(
				new AppUser("admin", "$2a$12$VXaUdQOT7AWrd8ADin1sQesIdfmF.nShAvzcq/BHZtEJVgoCbDjkm", "ADMIN", member1));

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

	public static List<Book> generateBooks(int count, List<Author> authors, List<Member> members, List<Rental> rentals,
			RentalRepository rentalRepository) {
		List<Book> books = new ArrayList<>();
		List<Rental> shuffledRentals = new ArrayList<>(rentals);

		Collections.shuffle(shuffledRentals);

		for (int i = 0; i < count; i++) {
			String title = TITLES[i];
			String totalPages = String.valueOf(random.nextInt(500) + 100);
			double rating = RATINGS[random.nextInt(RATINGS.length)];
			String publishesDate = PUBLISH_DATES[random.nextInt(PUBLISH_DATES.length)];
			double price = Math.round(random.nextDouble() * 300);
			String isbnNumber = ISBNS[random.nextInt(ISBNS.length)];
			Author author = authors.get(random.nextInt(authors.size()));
			Member member = members.get(random.nextInt(members.size()));
			String memberId = MEMBER_IDS[random.nextInt(MEMBER_IDS.length)];
			String bookId = MEMBER_IDS[random.nextInt(BOOK_IDS.length)];
			String dueDate = DUE_DATES[random.nextInt(DUE_DATES.length)];
			String rentDate = RENT_DATES[random.nextInt(RENT_DATES.length)];

			for (int j = 0; j < 3; j++) {
				Rental rental = new Rental(memberId, bookId, dueDate, rentDate);
				rentalRepository.save(rental);
//				Rental rental = shuffledRentals.get(i);
				Book book = new Book(title, totalPages, rating, publishesDate, price, isbnNumber, 3, author, member,
						rental);
				book.setAuthor(author);
				book.setMember(member);
				book.setRental(rental);
				Hibernate.initialize(book.getAuthor()); // initialize lazy-loaded author
				Hibernate.initialize(book.getMember()); // initialize lazy-loaded member
				books.add(book);
			}

		}
		return books;
	}

	public static List<Rental> generateRentals(int count, List<Member> members) {
		List<Rental> rentals = new ArrayList<>();
		for (int i = 0; i < count; i++) {
			String memberId = MEMBER_IDS[random.nextInt(MEMBER_IDS.length)];
			String bookId = MEMBER_IDS[random.nextInt(BOOK_IDS.length)];
			String dueDate = DUE_DATES[random.nextInt(DUE_DATES.length)];
			String rentDate = RENT_DATES[random.nextInt(RENT_DATES.length)];
			Rental rental = new Rental(memberId, bookId, dueDate, rentDate);
			rentals.add(rental);
		}
		return rentals;
	}

}
