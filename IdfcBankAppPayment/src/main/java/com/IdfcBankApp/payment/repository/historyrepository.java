package com.IdfcBankApp.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.IdfcBankApp.payment.model.historytransaction;

@Repository
public interface historyrepository extends MongoRepository<historytransaction, String> {


}
