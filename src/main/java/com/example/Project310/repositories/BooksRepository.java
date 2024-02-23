package com.example.Project310.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Project310.model.Books;

@RepositoryRestResource
public interface BooksRepository extends CrudRepository<Books, Long> {
	@Query("select b from Books b where b.tiltle = ?1")
	List<Books> findByTiltle(@Param("tiltle") String tiltle);
	
	List<Books> findByTotalPages(@Param("totalPages") String totalPages);
	
	List<Books> findByRating(@Param("rating") long rating);
	
	List<Books> findByPublishesDate(@Param("publishesDate") String publishesDate);
}
