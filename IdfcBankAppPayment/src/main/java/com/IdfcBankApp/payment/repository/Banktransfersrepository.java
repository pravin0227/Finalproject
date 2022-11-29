package com.IdfcBankApp.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IdfcBankApp.payment.model.Banktransfers;

public interface Banktransfersrepository extends MongoRepository<Banktransfers, String>{

}
