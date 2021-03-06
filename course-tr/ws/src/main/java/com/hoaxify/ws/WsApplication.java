package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;


// @SpringBootApplication ile Spring otomatik olarak butun requestleri secure hale getiriyor,
// bu da bizim 401 gibi bad response'lar almamiza sebep oluyor
// SecurityAutoConfiguration'u exclude ederek bu sorundan kurtuluyoruz
//@SpringBootApplication
@SpringBootApplication//(exclude = SecurityAutoConfiguration.class)
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
			for (int i = 1; i <= 25; i++) {
				User user = new User();
				user.setUsername("user" + i);
				user.setDisplayName("display" + i);
				user.setPassword("afacan");
				userService.save(user);
			}
		};
	}
}
