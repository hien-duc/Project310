package com.example.Project310.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Project310.model.Book;

@RepositoryRestResource
public interface BooksRepository extends CrudRepository<Book, Long> {
	@Query("select b from Books b where b.tiltle = ?1")
	List<Book> findByTiltle(@Param("tiltle") String tiltle);

	List<Book> findByTotalPages(@Param("totalPages") String totalPages);

	List<Book> findByRating(@Param("rating") long rating);

	List<Book> findByPublishesDate(@Param("publishesDate") String publishesDate);
}
