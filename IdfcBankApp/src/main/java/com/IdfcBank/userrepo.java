package com.IdfcBank;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userrepo extends MongoRepository<User, String> {

	public User findByEmail(String email);
	
}
