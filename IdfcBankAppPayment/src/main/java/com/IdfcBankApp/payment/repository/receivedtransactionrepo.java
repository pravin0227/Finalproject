package com.IdfcBankApp.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.IdfcBankApp.payment.model.receivedtransactions;

@Repository
public interface receivedtransactionrepo extends MongoRepository<receivedtransactions, String> {

}
