package com.hoaxify.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Katmanli mimari anlayisiyla controller ve repository arasina bu islerin tamamini yapacak bir katman ekleyerek
// ikisini birbirinden izole etmek gerekir. Userservice bizim icin bu isi yapacak. DB'ye yazma sile vs isleri buraya
@Service
public class UserService {

	UserRepositoryIF userRepository;
	PasswordEncoder pwdEncoder;

	// Farkli bir yontem olarak constructor injection kullanabiliriz,
	// UserController'da @Autowired ile
	// dependency injection kullanmistik.
	// Eger tek bir constructor varsa onun tepesine @Autowired yazmaya gerek yok
	// cunku her zaman bu constructor kullanilacaktir.
	// @Autowired
	public UserService(UserRepositoryIF userRepository, PasswordEncoder pwdEncoder) {
		this.userRepository = userRepository;
		this.pwdEncoder = pwdEncoder;
	}

	public void save(User user) {
		String encryptedPwd = this.pwdEncoder.encode(user.getPassword());
		user.setPassword(encryptedPwd);
		userRepository.save(user);
	}
	
	public Page<User> getUsers(Pageable page, User user) {
		if (user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

// Projection yontemi
//	public Page<UserProjection> getUsers(Pageable page) {
//		return userRepository.getAllUsersProjection(page);
//	}
}
