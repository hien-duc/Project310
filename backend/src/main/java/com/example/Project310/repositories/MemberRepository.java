package com.example.Project310.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.example.Project310.model.Member;

@RepositoryRestResource
public interface MemberRepository extends CrudRepository<Member, Long> {
	Optional<Member> findById(@Param("id") long id);
}
