package com.IdfcBankApp.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.IdfcBankApp.payment.model.payment;

@Repository
public interface paymentrepository extends MongoRepository<payment, String>{

	boolean existsByUpiid(String upiid);

	boolean existsByPhoneno(String phoneno);

}
