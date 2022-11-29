package com.IdfcBankApp.UpdateProfile.usermodel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/*@Data
@Document(collection="updateprofile")*/

@Data
@Document(collection="updateprofile")
public class User {
	
	@Id
	private String accountno;
	private String name;
	private String email;
	private String phoneno;
	private String pan;
	private String dob;
	private String city;
	private String state;
	private String pincode;
	private String upiid;

}

