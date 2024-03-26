package com.example.Project310.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Project310.model.Book;
import com.example.Project310.model.Member;

@RepositoryRestResource
public interface BookRepository extends CrudRepository<Book, Long> {
	@Query("select b from Book b where b.title = ?1")
	List<Book> findByTitle(@Param("title") String title);

	List<Book> findByTotalPages(@Param("totalPages") String totalPages);

	List<Book> findByRating(@Param("rating") long rating);

	List<Book> findByPublishesDate(@Param("publishesDate") String publishesDate);

	List<Book> findByIsbnnumber(@Param("isbnnumber") String isbnnumber);
	
	 List<Book> findByMember(@Param("member")Member member);

}
