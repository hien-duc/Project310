package com.example.Project310.repositories;

import com.example.Project310.model.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AuthorRepository extends CrudRepository<Author, Long> {
}
