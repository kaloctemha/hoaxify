package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // null olan fieldlari gonderme
public class ApiError {
	private int status;
	private String message;
	private String path;
	private long timeStamp = new Date().getTime();
	private  Map<String, String> validationErrors;
	
	public ApiError(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}
}
