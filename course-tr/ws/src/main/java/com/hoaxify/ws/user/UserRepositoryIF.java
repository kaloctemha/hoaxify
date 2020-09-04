package com.hoaxify.ws.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryIF extends JpaRepository<User, Long> {

	// JpaRepository : database'e erismek icin ihtiyacimiz olan birkac methodu bize
	// saglayan bir interface

	// bu sekilde method'u tanimlamak yeterli, arka planda Spring Data bizim icin DB
	// ye query uretecek ve gelen username parametresine gore "findBy_userName"
	// dedigimiz icin username 'e gore arama yapacak
	User findByuserName(String username);

}
