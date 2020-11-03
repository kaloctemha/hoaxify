package com.hoaxify.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryIF extends JpaRepository<User, Long> {

	// JpaRepository : database'e erismek icin ihtiyacimiz olan birkac methodu bize
	// saglayan bir interface

	// bu sekilde method'u tanimlamak yeterli, arka planda Spring Data bizim icin DB
	// ye query uretecek ve gelen username parametresine gore "findBy_userName"
	// dedigimiz icin username 'e gore arama yapacak
	User findByusername(String username);
	
	// Spring query olustururken oncelikle "Pageable page" i referans alarak query'i sekillendirecek
	// Donen objeyi "UserProjection" a donusturen bi cevrim yapacak
	//@Query(value = " Select u from User u") // user tablosudaki her seyi al
	// Page<UserProjection> getAllUsersProjection (Pageable page);
	
	
	Page<User> findByUsernameNot(String username, Pageable page);

}
