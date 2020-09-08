package com.hoaxify.ws.callControl;

import com.hoaxify.ws.user.User;

import lombok.Data;

@Data
public class CallRequest {
	
	public static final String TYPE_ANAONYMOUS = "anonymous";
	public static final String TYPE_REGULAR = "regular";
	
	private String requestType;

}
