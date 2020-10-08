package com.hoaxify.ws.shared;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

@Target({ElementType.PARAMETER}) //AuthController'da CurrentUser i auth() methodunun parametresi olarak kullanicaz
@Retention(RetentionPolicy.RUNTIME)
@AuthenticationPrincipal // AuthController'da Authentication objesinden alip User a cast etme islemini kendisi yapacak.
public @interface CurrentUser {
	
}
