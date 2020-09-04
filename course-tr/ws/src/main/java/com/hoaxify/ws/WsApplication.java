package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;


// @SpringBootApplication ile Spring otomatik olarak butun requestleri secure hale getiriyor,
// bu da bizim 401 gibi bad response'lar almamiza sebep oluyor
// SecurityAutoConfiguration'u exclude ederek bu sorundan kurtuluyoruz
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
			User user = new User();
			user.setUserName("user1");
			user.setDisplayName("display1");
			user.setPassword("afacan");
			userService.save(user);
		};
	}
}
