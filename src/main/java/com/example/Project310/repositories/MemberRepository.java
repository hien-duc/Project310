package com.example.Project310.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.Project310.model.Member;

@RepositoryRestResource
public interface MemberRepository extends PagingAndSortingRepository<Member, Long> {

}
