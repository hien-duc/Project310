//package com.example.Project310.web;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.lang.NonNull;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.Project310.model.Book;
//import com.example.Project310.model.Member;
//import com.example.Project310.repositories.BookRepository;
//import com.example.Project310.repositories.MemberRepository;
//import com.example.Project310.service.BookService;
//
//@RestController
//@RequestMapping("/api/members")
//public class BookController {
//
//	private final BookService bookService;
//	private final BookRepository bookRepository;
//	private final MemberRepository memberRepository;
//
//	public BookController(BookService bookService, BookRepository bookRepository, MemberRepository memberRepository) {
//		this.bookService = bookService;
//		this.bookRepository = bookRepository;
//		this.memberRepository = memberRepository;
//	}
//
////	@GetMapping("/member/{memberId}")
////	public ResponseEntity<List<Book>> getBooksForMember(@PathVariable Long memberId) {
////		List<Book> books = bookService.getBooksForMember(memberId);
////		return ResponseEntity.ok().body(books);
////	}
//
////	@GetMapping("/{memberId}/books")
////	public ResponseEntity<List<Book>> getBooksByMemberId(@PathVariable("memberId") long memberId) {
////		Optional<Member> memberOptional = memberRepository.findById(memberId);	
////		if (memberOptional.isPresent()) {
////			Member member = memberOptional.get();
////			List<Book> books = bookRepository.findByMember(member);
////			 return new ResponseEntity<>(books, HttpStatus.OK);
////		} else {
////			return ResponseEntity.notFound().build();
////		}
////	}
//}
