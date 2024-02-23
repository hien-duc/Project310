package com.example.Project310.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import com.example.Project310.model.Authors;
@RepositoryRestResource
public interface AuthorsRepository extends CrudRepository<Authors, Long> {

}
