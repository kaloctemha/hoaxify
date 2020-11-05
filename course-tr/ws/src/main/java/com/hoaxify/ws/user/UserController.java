package com.hoaxify.ws.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.vm.UserVM;;

//kullanici ile alakali butun http req lerin ulastigi class olacak
// restful bi web servisi yazmaya calisiyoruz

@RestController
@RequestMapping("/api/1.0")
public class UserController {

	// Uyg ayaga kalktiginda Spring 'dependency injection' i gorup gidip bizim
	// userService objemizi setleyecek
	@Autowired
	UserService userService;

//	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	// @CrossOrigin // client ile server in portlarinin uyusmazligini gideren bir
	// sey
	// @ResponseStatus(HttpStatus.OK) // Gelen Post Requestine donecegimiz cevap
	// tipini belirleyebiliyoruz
	@PostMapping("/users") // Spring'e bu method bu path'e gelen post requestlerini isleyecek diyoruz.
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

	@GetMapping("/users")
	public Page<UserVM> getUsers(Pageable page, @CurrentUser User user) {

		// ESKI STIL
		/*
		 * return userService.getUsers(page).map(new Function<User, UserVM>() {
		 * 
		 * @Override public UserVM apply(User t) { return new UserVM(t); } });
		 */

		// Lambda function
		/*
		 * return userService.getUsers(page).map((user) -> { return new UserVM(user);
		 * });
		 */

		// map: array tipindeki data setinde dongu yapip, oradaki objeyi baska bir
		// objeye donusturme islemi
		// burada User tipinde obje alip UserVM tipinde obje donecek

		// METHOD REFERENCE <-- Java8
		// Biliyoruz ki map bize bir User objesi verecek, biz de map i UserVM in
		// constructor ina referans olarak paslicaz
		// UserVM in constructor ine map den aldigin User objesini referans olarak
		// gonder ve yeni obje olustur
		return userService.getUsers(page, user).map(UserVM::new);

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
