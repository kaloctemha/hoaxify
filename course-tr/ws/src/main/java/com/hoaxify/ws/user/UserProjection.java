package com.hoaxify.ws.user;



// UserProjection'un en kotu yani, userRepository ile gelen butun hazir fonksiyonlari kaybediyoruz
// o isleri yapan methodlari tekrar yazmak gerekecek
// bu nedenle kesin cozum DTO(Data Transfer Object) veya VM(View Model) denilen yontem
public interface UserProjection {
	String getUserName();
	String getDisplayName();
	String getImage();
}
