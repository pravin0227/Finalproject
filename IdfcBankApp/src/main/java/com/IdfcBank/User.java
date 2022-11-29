package com.IdfcBank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection="ractnative")
public class User {
	
	@Id
	private String accountno;
	private String name;
	private String email;
	private String password;
	private String phoneno;
	private String city;
	private String state;
	private String pincode;
	private double balance;

}
