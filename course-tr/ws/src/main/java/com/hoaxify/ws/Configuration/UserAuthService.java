package com.hoaxify.ws.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepositoryIF;

@Service
public class UserAuthService implements UserDetailsService {
	
	@Autowired
	UserRepositoryIF userRepository;
		
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		User userInDB = userRepository.findByusername(username);
		if(userInDB == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		// Artik Spring authentication yaparken bizim olusturdugumuz UserDetails'i implement eden HoaxifyUserDetails
		// objesindeki verileri kullanacak
		return userInDB;
	}
}
