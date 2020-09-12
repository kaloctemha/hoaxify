package com.hoaxify.ws.callControl;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


public class AnonymousCall implements CallControlIF {

	@Override
	public ResponseEntity handleIncomingCall() {
		
		return ResponseEntity.status(HttpStatus.OK).body("AnonymousCall");
	}

}
