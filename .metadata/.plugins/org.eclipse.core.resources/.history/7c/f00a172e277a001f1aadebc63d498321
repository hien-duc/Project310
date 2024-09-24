package com.example.Project310.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Project310.model.AppUser;
import com.example.Project310.model.Book;
import com.example.Project310.model.Member;
import com.example.Project310.repositories.AppUserRepository;
import com.example.Project310.repositories.BookRepository;
import com.example.Project310.repositories.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BookRepository bookRepository;

    // Method to retrieve user data by username
    public Optional<AppUser> getUser(String username) {
        return userRepository.findByUsername(username);
    }

    // Method to retrieve member data by user ID
    public Member getMember(Long userId) {
        return memberRepository.findByUserId(userId);
    }

    // Method to retrieve books associated with a member by member ID
    public List<Book> getBooks(Long memberId) {
        return bookRepository.findByMemberId(memberId);
    }
}
