package com.hoaxify.ws.callControl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RegularCall implements CallControlIF{

	@Override
	public ResponseEntity handleIncomingCall() {
		// TODO Auto-generated method stub
		return  ResponseEntity.status(HttpStatus.OK).body("RegularCall");
	}

}
