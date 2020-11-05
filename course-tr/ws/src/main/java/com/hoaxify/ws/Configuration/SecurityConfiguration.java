package com.hoaxify.ws.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationEventPublisher;
import org.springframework.security.authentication.DefaultAuthenticationEventPublisher;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserAuthService userAuthSvc;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		// Spring default olarka csrf - cross side request forgery ' yi enable eder.
		// Client post attiginda req icinde bir de gizli token olur, aslinda bu bir guvenlik kontroludur.
		// O request'in kullanicinin kendi aksiyonlariyla gonderildigini garanti etmek gibi bir seydir
		http.csrf().disable();
		//http.httpBasic();
		
		//http.headers().httpStrictTransportSecurity().disable();
		
		// port sorunu icin yazdim tam ne yaptigina hakim degilim
		http.headers().frameOptions().disable();
		
		// "www-authentica basic" header ini ucurmak icin AuthenticationEntryPoint kullandik,
		// Spring bunu yollarsa browser bi sign-in pop up cikariyor
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());
		
		// AuthController.java'da gelen req in authentication cridential'lari ile geldiginden
		// emin olmak icin handleAuthentication() icerisinde  bir suru is yaptik. 
		// Simdi amac bu isi Spring'e yaptirmak, bu durumda @PostMapping("/api/1.0/auth")'a gelen
		// butun req lerin authenticated bir sekilde gelmesi gerektigini Spring'e soylememiz gerekiyor.
		// Yani spring gelen req'i bize ulasmadan arkada authenticate edecek.
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/1.0/auth/").authenticated()
								.and().authorizeRequests().anyRequest().permitAll(); // ustteki iki req disinda hersey istedigi gibi gelebilir demek
		
		// Biz frontend'den basarili bir login attigimizda bir session uretiliyor, cookie olusturuluyor
		// hemen ardindan frontend'den bu sefer "no-auth" ile req attigimizda da fail olmasi gerekirken success oluyor.
		// Bunu engellemek icin sessionCreationPolicy i configledik, her request artik cridential icermek zorunda
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// Spring e diyoruz ki eger bir user arayacaksan, benim UserAuthService imi kullan
		// arka planda UserAuthService'deki loadByUsername() cagiralacak
		auth.userDetailsService(userAuthSvc);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
