package com.IdfcBank.usercontroller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IdfcBank.User;
import com.IdfcBank.userrepo;


@RestController
@RequestMapping("/User")
public class UserController {

@Autowired
private userrepo userrepo;



@PostMapping("/createUser")
public User createUser(@RequestBody User user) {

 return userrepo.save(user);
 

}
@PutMapping("/updatepas/{email}/{accountno}/{password}")
public String updatepass(@PathVariable String email, @PathVariable String accountno,@PathVariable String password) {
	if(!userrepo.existsById(accountno)) {
		return "Accountno does not exists";
	}
	
	User user = userrepo.findById(accountno).get();
	if(!userrepo.existsById(accountno)) {
		return "accountno does not exists";
	}else if(user.getEmail().equals(email)) {
		user.setPassword(password);
		userrepo.save(user);
		return "password updated successfully";
	}else {
		return "email address does not exists";
	}
}
@PutMapping("/updatepass/{email}/{accountno}")
public String updateemail2(@PathVariable String email, @PathVariable String accountno) {
	User user = userrepo.findById(accountno).get();
	user.setEmail(email);
	userrepo.save(user);
	return "Updated successfully";
	
}
@GetMapping("/getAllusers")
public List<User> getallusers() {
	return userrepo.findAll();
}

@GetMapping("/getbycheck/{accountno}")
public boolean getcheck(@PathVariable String accountno) {
	if(userrepo.findById(accountno).get()==null) {
		System.out.println(userrepo.findById(accountno).get());
		return true;
		
	}
	else {
		System.out.println(userrepo.findById(accountno).get());
		return false;
	}
}


@PutMapping("/updation/{email}/{accountno}")
public String updateemail(@PathVariable String email, @PathVariable String accountno) {
	User user = userrepo.findById(accountno).get();
	user.setEmail(email);
	userrepo.save(user);
	return "Updated successfully";
}

@GetMapping("/getbyaccountno/{accountno}")
public User getbyemail(@PathVariable String accountno) {
	if(userrepo.existsById(accountno)) {
	 return userrepo.findById(accountno).get();
	}
	return null;
}

@GetMapping("/ViewBalance/{accountno}")
public Optional<User> getbalance(@PathVariable String accountno) {
return userrepo.findById(accountno);
}
@DeleteMapping("/deleteById/{accountno}")
public void deletebyId(@PathVariable String accountno){

	userrepo.deleteById(accountno);
	
}
}
