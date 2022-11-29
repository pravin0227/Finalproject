package com.IdfcBank.transactionmodel;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Withdraw")
public class Withdraw {

private String accountno;
private int amount;
private String status;
private LocalDateTime time;
}
