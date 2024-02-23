package com.example.Project310;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.Project310.repositories.AuthorsRepository;
import com.example.Project310.repositories.BooksRepository;
import com.example.Project310.model.*;

@SpringBootApplication
@ComponentScan("com.example.Project310.repository")
public class Project310Application implements CommandLineRunner{
	private static final Logger logger = LoggerFactory.getLogger(Project310Application.class);
	private final BooksRepository repository;
	private final AuthorsRepository arepository;

	public static void main(String[] args) {
		SpringApplication.run(Project310Application.class, args);
	}

	public Project310Application(BooksRepository repository, AuthorsRepository arepository) {
		this.repository = repository;
		this.arepository = arepository;
	}

	@Override
	public void run(String... args) throws Exception {
		Books book1 = new Books("name", "name", 0, "name");
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		repository.save(new Books("name", "name", 0, "name"));
		
	}

}
