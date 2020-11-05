package com.hoaxify.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepositoryIF;
import com.hoaxify.ws.user.vm.UserVM;

@RestController
public class AuthController {

	@Autowired
	UserRepositoryIF userRepository;

	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		// @CurrentUser sayesinde authenticate edilmis user direk olarak bizim user
		// objesine cast ediliyor. Bunu @AuthenticationPrincipal sagliyor
		
		return new UserVM(user);
	}
}
