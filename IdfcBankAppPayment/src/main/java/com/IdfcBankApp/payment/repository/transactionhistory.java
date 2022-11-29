package com.IdfcBankApp.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.IdfcBankApp.payment.model.transferhistory;

@Repository
public interface transactionhistory extends MongoRepository<transferhistory, String>{

}
