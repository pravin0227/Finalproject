package com.IdfcBank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IdfcBank.transactionmodel.Withdraw;

public interface WithdrawRepository extends MongoRepository<Withdraw, String>{

}
