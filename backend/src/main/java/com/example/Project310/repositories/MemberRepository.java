package com.example.Project310.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Project310.model.Member;

@RepositoryRestResource
public interface MemberRepository extends CrudRepository<Member, Long> {
	Optional<Member> findById(@Param("id") long id);

	@Query("SELECT m FROM Member m JOIN m.appUser u WHERE u.username = :username")
	Member findByUsername(@Param("username") String username);

	@Query("SELECT m FROM Member m JOIN m.appUser u WHERE u.id = :userId")
	Member findByUserId(@Param("userId")Long userId);

}
