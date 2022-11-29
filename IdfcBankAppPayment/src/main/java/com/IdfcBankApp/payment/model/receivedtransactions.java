package com.IdfcBankApp.payment.model;

import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="receivedtransactions")
public class receivedtransactions {

	@Id
	private String accountno;
	private double amount;
	private String name;
	private String monthnumber;
	private int day;
	private int year;
	private String time;
	private char letter;
			
}
