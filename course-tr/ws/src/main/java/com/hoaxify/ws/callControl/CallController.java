package com.hoaxify.ws.callControl;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CallController {

	private CallControlIF callControlIF;

	@PostMapping("/api/callControl")
	ResponseEntity handleCall(@RequestBody CallRequest cr) {
		String requestType = cr.getRequestType();

		switch (requestType) {
		case CallRequest.TYPE_REGULAR:
			callControlIF = new RegularCall();

			break;
		case CallRequest.TYPE_ANAONYMOUS:
			callControlIF = new AnonymousCall();
			break;
		default:
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("BAD REQUEST");
		}
		
		return callControlIF.handleIncomingCall();
	}
}
