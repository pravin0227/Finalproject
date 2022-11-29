package com.IdfcBank.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.IdfcBank.transactionmodel.Transfer;

public interface transferrepo extends MongoRepository<Transfer, String> {

}
