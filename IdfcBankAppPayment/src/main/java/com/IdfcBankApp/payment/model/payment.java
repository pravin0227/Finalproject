package com.IdfcBankApp.payment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="payment")
public class payment {
	@Id
	private String accountno;
	private String name;
	private double balance;
	private String ifsc;
	private String upiid;
	private String phoneno;

}
