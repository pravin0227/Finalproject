package com.IdfcBankApp.payment.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "transactionhistory")
public class transferhistory {
	
	@Id
	private String accountno;
	private double amount;
	private String name;
	private String monthnumber;
	private int day;
	private int year;
	private String time;
	private char letter;
	private String transactiontype;

}
