package com.hoaxify.ws.Configuration;

import java.io.IOException;

import org.springframework.data.domain.Page;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;


/*
 {
    "content": [
        {
            "id": 1,
            "userName": "user1",
            "displayName": "display1",
            "password": "$2a$10$lLY82S8/Y5k.CX5GAXHVMeUwMPTwYV6YMw2x3knx9BwrQeCiDpqr6",
            "image": null,
            "enabled": true,
            "username": null,
            "authorities": [
                {
                    "authority": "Role_user"
                }
            ],
            "accountNonLocked": true,
            "accountNonExpired": true,
            "credentialsNonExpired": true
        },
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageSize": 10,
        "pageNumber": 0,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 3,
    "totalElements": 25,
    "last": false,
    "size": 10,
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "numberOfElements": 10,
    "first": true,
    "empty": false
} 
 
*/

// Alttaki methodda dondugumuz Page objesi istemedigimiz bircok field ile frontend'e donuyor, bunu yerine doncegimiz JSON objesini (Page tipindekiler icin)
// serialize ederek istedigimiz sekilde dondurecegiz
// gen ve serilizers araciliyla bunu yapacagiz

//public Page<User> getUsers(Pageable page){
//	return userService.getUsers(page);
//	
//}

//@JsonComponent
//public class PageSerializer extends JsonSerializer<Page>{
//
//	@Override
//	public void serialize(Page value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
//		gen.writeStartObject();
//		gen.writeFieldName("content"); // page icerisindeki content field'i
//		serializers.defaultSerializeValue(value.getContent(), gen);// bu content icin JSON View kullanmasini soyle
//		gen.writeObjectField("pageable", value.getPageable());
//		gen.writeBooleanField("last", value.isLast());
//		gen.writeNumberField("totalPages", value.getTotalPages());
//		gen.writeNumberField("totalElements", value.getTotalElements());
//		gen.writeNumberField("size", value.getSize());
//		gen.writeObjectField("sort", value.getSort());
//		gen.writeNumberField("numberOfElements", value.getNumberOfElements());
//		gen.writeBooleanField("first", value.isFirst());
//		gen.writeBooleanField("empty", value.isEmpty());
//		gen.writeEndObject();
//	}
//}
