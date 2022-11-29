package com.IdfcBankApp.UpdateProfile.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IdfcBankApp.UpdateProfile.repository.Userrepository;
import com.IdfcBankApp.UpdateProfile.usermodel.User;

@RestController
@RequestMapping("/user")
public class usercontroller {
	

	
	@Autowired
	private Userrepository repo;
	
	
	@PostMapping("/saveuser")
	public User saveuser(@RequestBody User user) {
		return repo.save(user);
	}
	
	@GetMapping("/getbyaccountno/{accountno}")
	public User getuser(@PathVariable String accountno) {
		return repo.findById(accountno).get();
	}
	
	@PutMapping("/updatemail/{email}/{accountno}")
	public String  updatemail(@PathVariable String email, @PathVariable String accountno) {
	  User user = repo.findById(accountno).get();
	  user.setEmail(email);
	  repo.save(user);
	  return "Updated successfully"; 
			
	}
	
	@PutMapping("/updatenumber/{phoneno}/{accountno}")
	public String updatephoneno(@PathVariable String phoneno, @PathVariable String accountno) {
		User user = repo.findById(accountno).get();
		user.setPhoneno(phoneno);
		repo.save(user);
		
		return "Updated successfully";
	}
	
	
	@PutMapping("/updatepan/{pan}/{accountno}")
	public String updatepan(@PathVariable String pan , @PathVariable String accountno) {
		User user = repo.findById(accountno).get();
		user.setPan(pan);
		repo.save(user);
		return "Updated successfully";
	}
	
	@PutMapping("/updatedob/{dob}/{accountno}")
	public String updatedob(@PathVariable String dob, @PathVariable String accountno) {
		User user = repo.findById(accountno).get();
		user.setDob(dob);
		repo.save(user);
		return "Updated successfully";
	}
	
	@PutMapping("/updateaddress/{city}/{state}/{pincode}/{accountno}")
	public String updateaddress(@PathVariable String city, @PathVariable String state, @PathVariable String pincode,@PathVariable String accountno) {
		User user = repo.findById(accountno).get();
		user.setCity(city);
		user.setState(state);
		user.setPincode(pincode);
		repo.save(user);
		return "Updated successfully";
	}
}

