package com.hoaxify.ws.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;


@RestController
public class ErrorHandler implements ErrorController {
	
	@Autowired
	private ErrorAttributes errorAttributes;
	
	@RequestMapping("/error") // // Spring in basic errorcontroller ini ezmek icin kendi error controller imizi yazdik ki ApiError'u kullanabilelim
	ApiError handleError(WebRequest webRequest) {
		Map<String, Object> attributeMap = this.errorAttributes.getErrorAttributes(webRequest, true);
		String message = (String) attributeMap.get("message");
		String path = (String) attributeMap.get("path");
		int statusCode = (int) attributeMap.get("status");
		ApiError apiError = new ApiError(statusCode, message, path);

		if (attributeMap.containsKey("errors")) {
			Map<String, String> validationErrors = new HashMap<>();
			List<FieldError> fieldErrors = (List<FieldError>) attributeMap.get("errors");

			for (FieldError fieldError : fieldErrors) {
				validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
			
			apiError.setValidationErrors(validationErrors);
		}
		return apiError;
	}

	@Override
	public String getErrorPath() {
		return "/error";
	}

}
