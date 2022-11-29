package com.IdfcBank.transactioncontroller;



import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IdfcBank.User;
import com.IdfcBank.userrepo;
import com.IdfcBank.repository.WithdrawRepository;
import com.IdfcBank.repository.depositRepo;
import com.IdfcBank.repository.transferrepo;
import com.IdfcBank.transactionmodel.Deposit;
import com.IdfcBank.transactionmodel.Transfer;
import com.IdfcBank.transactionmodel.Withdraw;
@RestController
@RequestMapping("/transaction")
public class TrasactionController {
	
	
	
	@Autowired
	private depositRepo depositrepo;
	@Autowired
	private WithdrawRepository withdrawrepo;
	@Autowired
	private transferrepo transferrepo;
	@Autowired
	private userrepo userrepo;

	@GetMapping("/deposit/{amount}/{accountno}")
	public String depositamount(@PathVariable int amount, @PathVariable String accountno) {
		/*
		 * userrepo.findAll().filter(user ->
		 * user.getAccountNo().equals(accountNo)).doOnNext(user -> {
		 * user.setBalance(user.getBalance() + amount); System.out.println(user);
		 * }).flatMap(userrepo::save).subscribe();
		 */
		
		User user =userrepo.findById(accountno).get();
		
		user.setBalance(user.getBalance()+amount);
		
		System.out.println(user.getBalance());
		
		userrepo.save(user);
		
		System.out.println(user);
		
		depositrepo.save(new Deposit(accountno, amount, amount + " deposited successfully ",
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))));
		
		return new Deposit(accountno, amount, amount + " deposited successfully ",
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))).toString();	
		}
	
	
	
	
		/*
		 * @GetMapping("/deposit/{accountno}") public List<Deposit> deposithistory
		 * (@PathVariable String accountno) {
		 * 
		 * return
		 * depositrepo.findAll().stream().filter(user->user.getAccountno().equals(
		 * accountno)).collect(Collectors.toList());
		 * 
		 * }
		 * 
		 * @GetMapping("/withdraw/{accountno}") public List<Withdraw> withdrawhistory
		 * (@PathVariable String accountno) {
		 * 
		 * return
		 * withdrawrepo.findAll().stream().filter(user->user.getAccountno().equals(
		 * accountno)).collect(Collectors.toList());
		 * 
		 * }
		 * 
		 * @GetMapping("/deposit/{accountno}") public List<Transfer> transferhistory
		 * (@PathVariable String accountno) {
		 * 
		 * return
		 * transferrepo.findAll().stream().filter(user->user.getAccountno().equals(
		 * accountno)).collect(Collectors.toList());
		 * 
		 * }
		 */


	/*
	 * @GetMapping("/viewBalance/{accountNo}") public getUser(@PathVariable String
	 * accountNo) {
	 * 
	 * kafkatemplate.send("useractivities1", new
	 * UserActivities("viewBalance",accountNo,
	 * " user viewed Balance "+LocalDateTime.now(ZoneId.of("Asia/Kolkata"))));
	 * 
	 * return userrepo.findAll().filter(user ->
	 * user.getAccountNo().equals(accountNo)); }
	 */

	@GetMapping("/withdraw/{amount}/{accountno}")
	public String withdrawamount(@PathVariable int amount, @PathVariable String accountno) {
		User user =userrepo.findById(accountno).get();
		
		if(user.getBalance()<amount) {
			return "Insufficient fund";
		}else if(amount>=15000) {
			return "We cant proceed with the more than 1500rs";
		}
		
		user.setBalance(user.getBalance()-amount);
		userrepo.save(user);
		withdrawrepo.save(new Withdraw(accountno, amount, amount + " withdraw successfully",
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))));
		
		return new Withdraw(accountno, amount, amount + " withdraw successfully",
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))).toString();
	}
	
	
	
	@GetMapping("/transfer/deposit/{AccountNo}")
	public List<Deposit> getdeposits(@PathVariable String AccountNo) {
		return depositrepo.findAll().stream().filter(user->user.getAccountno().equals(AccountNo)).toList();
	}
	@GetMapping("/transfer/withdraw/{AccountNo}")
	public List<Withdraw> getwithdraws(@PathVariable String AccountNo) {
		return withdrawrepo.findAll().stream().filter(user->user.getAccountno().equals(AccountNo)).collect(Collectors.toList());
	}
	@GetMapping("/transfer/transfer/{AccountNo}")
	public List<Transfer> gettransfers(@PathVariable String AccountNo) {
		return transferrepo.findAll().stream().filter(user->user.getAccountno().equals(AccountNo)).collect(Collectors.toList());
	}

	@GetMapping("/transfer/{amount}/{SenderAccountNo}/{RecieverAccountNO}")
	public String transfermoney(@PathVariable int amount, @PathVariable String SenderAccountNo,
			@PathVariable String RecieverAccountNO) {
		User sender = userrepo.findById(SenderAccountNo).get();
		User receiver = userrepo.findById(RecieverAccountNO).get();
		if(sender.getBalance()<amount) {
			return "Insufficient fund :( ";
		}
		else if (amount >= 20000) {
			transferrepo.save(new Transfer(SenderAccountNo, RecieverAccountNO, amount,
					"Cannot Transfer amount more than 20000 at a time", LocalDateTime.now(ZoneId.of("Asia/Kolkata"))));
			return "we cant transfer more than 200000rs";
		}
		
		sender.setBalance(sender.getBalance()-amount);
		receiver.setBalance(receiver.getBalance()+amount);
		userrepo.save(sender);
		userrepo.save(receiver);
		transferrepo.save(new Transfer(SenderAccountNo, RecieverAccountNO, amount,
				amount + " transferred successfully to the account " + RecieverAccountNO,
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))));
		
		return new Transfer(SenderAccountNo, RecieverAccountNO, amount,
				amount + " transferred successfully to the account " + RecieverAccountNO,
				LocalDateTime.now(ZoneId.of("Asia/Kolkata"))).toString();
	}
}