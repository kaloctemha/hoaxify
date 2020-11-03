package com.hoaxify.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUserName, String> {
	
	@Autowired
	UserRepositoryIF userRepository;

	// ConstraintValidator<UniqueUserName, String>
	// Hangi validator'i implement edeceksin : UniqueUserName
	// Validate edecegin setin tipi ne?(bizdeki username bi String) :String
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		User user = userRepository.findByusername(username);
		if (user != null) {
			return false;
		}
		return true;
	}
}
