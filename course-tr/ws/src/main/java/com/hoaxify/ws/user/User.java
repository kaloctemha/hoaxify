package com.hoaxify.ws.user;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.ws.shared.Views;

import lombok.Data;

@Data // lombok un annotation'i, butun getter,setter,toStrong vs fonklari otomatik
		// arka planda yazdi
@Entity // database tablosu olacak
public class User implements UserDetails{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id // id field'i bizim tablomuzun PRIMARY KEY'i olsun demek
	@GeneratedValue // id yi hibernate kendi uretecek
	private long id;

	// bean validation
	@NotNull(message = "{hoaxify.constraint.userName.NotNull.message}")
	@Size(min = 4, max = 255)
	// @Column(unique = true) // ayni username tekrarlanamaz, hata durumunda exception atiyor ancak bizim
	// ApiError icerisine koyabilecegimiz bir cozum yok, o nedenle kendi constraint'imizi yaratacagiz
	@UniqueUserName  // kendi yazdigimiz annotation
	@JsonView(Views.Base.class)
	private String userName;

	@NotNull(message = "{hoaxify.constraint.displayName.NotNull.message}")
	@Size(min = 4, max = 255)
	@JsonView(Views.Base.class)
	private String displayName;

	@NotNull(message = "{hoaxify.constraint.password.NotNull.message}")
	@Size(min = 8, max = 255)
	//@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.Pattern.message}")
	// @JsonIgnore bunu kullanarak login requestine donulen cevapta json objesi icerisine pwd koyma sorununu cozebiliriz,
	// ama bu sefer signUP requestinden de cikarmis oluruz.
	private String password;
	
//	@NotNull
//	private String passwordRepeat;
	
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@JsonView(Views.Base.class)
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
