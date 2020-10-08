package com.hoaxify.ws.user;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueUsernameValidator.class })
public @interface UniqueUserName {
	
	// Eger bir data validation yapilacaksa, asagidaki 3 field MUST. message, groups ve payload
	// P.S. : @NotNull annotation'dan bakabilirsin
	String message() default "{hoaxify.constraint.username.Unique.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
