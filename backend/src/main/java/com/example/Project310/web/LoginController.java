package com.example.Project310.web;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Project310.model.AccountCredentials;
import com.example.Project310.model.AppUser;
import com.example.Project310.model.Book;
import com.example.Project310.model.Member;
import com.example.Project310.service.AuthService;
import com.example.Project310.service.JwtService;

@RestController
public class LoginController {
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final AuthService authService;

	public LoginController(JwtService jwtService, AuthenticationManager authenticationManager,
			AuthService authService) {
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
		this.authService = authService;
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginAndGetToken(@RequestBody AccountCredentials credentials) {
		try {

			UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
					credentials.username(), credentials.password());
			Authentication auth = authenticationManager.authenticate(authRequest);

			String token = jwtService.getToken(auth.getName());

			Optional<AppUser> appUser = authService.getUser(credentials.username());
			Member member = authService.getMember(appUser.get().getId());
			List<Book> books = authService.getBooks(member.getId());

			// Construct response with token and user data
			LoginResponse loginResponse = new LoginResponse(token, appUser, member, books);

			// Return response with token and user data in the header
			return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
					.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization").body(loginResponse);
		} catch (Exception e) {
			// Handle authentication failure
			return ResponseEntity.badRequest().body("Invalid username or password");
		}
	}

//	@PostMapping("/login")
//	public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
//
//		// Generate token and send it in the response Authorization header
//		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(credentials.username(),
//				credentials.password());
//		Authentication auth = authenticationManager.authenticate(creds);
//		// Generate token
//		String jwts = jwtService.getToken(auth.getName());
//		// Build response with the generated token
//		return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
//				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization").build();
//	}

}
