package com.hoaxify.ws.auth;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.Views;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepositoryIF;

@RestController
public class AuthController {

	@Autowired
	UserRepositoryIF userRepository;
	
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		// @CurrentUser sayesinde authenticate edilmis user direk olarak bizim user objesine cast ediliyor.
		// bunu @AuthenticationPrincipal sagliyor
		System.out.println(user);
		return ResponseEntity.ok(user);
	}
}
