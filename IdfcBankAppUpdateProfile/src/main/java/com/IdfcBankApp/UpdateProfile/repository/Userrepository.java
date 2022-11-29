package com.IdfcBankApp.UpdateProfile.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.IdfcBankApp.UpdateProfile.usermodel.User;

@Repository
public interface Userrepository extends MongoRepository<User, String>{

}
