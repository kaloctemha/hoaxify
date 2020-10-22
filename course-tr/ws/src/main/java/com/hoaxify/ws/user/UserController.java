package com.hoaxify.ws.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.error.ApiError;
import com.hoaxify.ws.shared.GenericResponse;

//kullanici ile alakali butun http req lerin ulastigi class olacak
// restful bi web servisi yazmaya calisiyoruz

@RestController
public class UserController {
	
	// Uyg ayaga kalktiginda Spring 'dependency injection' i gorup gidip bizim
	// userService objemizi setleyecek
	@Autowired
	UserService userService;
	
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	//@CrossOrigin  // client ile server in portlarinin uyusmazligini gideren bir sey
	//@ResponseStatus(HttpStatus.OK) // Gelen Post Requestine donecegimiz cevap tipini belirleyebiliyoruz
	@PostMapping("/api/1.0/users/") // Spring'e bu method bu path'e gelen post requestlerini isleyecek diyoruz.
	public GenericResponse createUser(@Valid @RequestBody User user) {// @Valid : Bean validation, user objesi bu
																		// methoda gelmeden spring valid mi bakacak
																		// (Hibernate Validator)

		// User tipindeki objenin fieldlari nasil otomatik olarak request ile gelen JSON
		// objesinden alinip setlenir?
		// Jackson Library : Json objesini parcalar ve bizim obje tipimizdeki field lar
		// ile map ederek setler
//		log.info(user.toString());
//		String username = user.getUserName();
//		String displayName = user.getDisplayName();
//
//		ApiError error = new ApiError(400, "Valitaion Error", "/api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//		if (username == null || username.isEmpty()) {
//			validationErrors.put("userName", "Username can not be null");
//		}
//
//		if (displayName == null || displayName.isEmpty()) {
//			validationErrors.put("displayName", "can not be null");
//		}
//
//		if (validationErrors.size() > 0) {
//			error.setValidationErrors(validationErrors);
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
//		}

		userService.save(user);
		// Jackson nasil gelen User objesini donusturduyse,
		// return ettigimiz GenericReponse objesini de JSON a donusturecek
		return new GenericResponse("User Created");
	}
	// ================== burayi ErrorHandler icerisine tasidik ==================
//	@ExceptionHandler(MethodArgumentNotValidException.class) // Validation olusursa bu method calissin demek
//	@ResponseStatus(HttpStatus.BAD_REQUEST) // bunu yazmazsak default OK statuslu bir response doner
//	public ApiError handleValidationException(MethodArgumentNotValidException ex) {
//		ApiError error = new ApiError(400, "Valitaion Error", "/api/1.0/users");
//		Map<String, String> validationErrors = new HashMap<>();
//
//		for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
//			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//		}
//		error.setValidationErrors(validationErrors);
//		return error;
//	}
}
