package com.IdfcBank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IdfcBank.transactionmodel.Deposit;

public interface depositRepo extends MongoRepository<Deposit, String> {

}
