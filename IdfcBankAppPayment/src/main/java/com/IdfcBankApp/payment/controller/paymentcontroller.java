package com.IdfcBankApp.payment.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IdfcBankApp.payment.model.Banktransfers;
import com.IdfcBankApp.payment.model.historytransaction;
import com.IdfcBankApp.payment.model.payment;
import com.IdfcBankApp.payment.model.receivedtransactions;
import com.IdfcBankApp.payment.model.transferhistory;
import com.IdfcBankApp.payment.repository.Banktransfersrepository;
import com.IdfcBankApp.payment.repository.historyrepository;
import com.IdfcBankApp.payment.repository.paymentrepository;
import com.IdfcBankApp.payment.repository.receivedtransactionrepo;
import com.IdfcBankApp.payment.repository.transactionhistory;

@RestController
@RequestMapping("/payment")
public class paymentcontroller {
	
	@Autowired
	private paymentrepository repo;
	
	@Autowired
	private receivedtransactionrepo receivedrepo;
	
	@Autowired
	private transactionhistory historyrepo;
	
	@Autowired
	private historyrepository repository;
	
	@Autowired
	private Banktransfersrepository bankrepo;
	
	@PostMapping("/save/paymentEntity")
	public payment getpayment(@RequestBody payment pay) {
		return repo.save(pay);
	}
	
	
	
	@GetMapping("/banktransfer/{accountno1}/{accountno2}/{amount}")
	public String getpayment(@PathVariable String accountno1, @PathVariable String accountno2, @PathVariable double amount) {
		payment pay1 = repo.findById(accountno1).get();
		
		if(pay1.getBalance()<amount) {
			return "Insufficient fund";
		}else {
		
		payment pay2 = repo.findById(accountno2).get();
		
		pay2.setBalance(pay2.getBalance()+amount);
		
		System.out.println(pay2.getBalance());
		
		LocalDateTime time = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
		int hour = time.getHour();
		int minute=time.getMinute();
		String time2=hour+":"+minute;
		receivedrepo.save(new receivedtransactions(accountno2,amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0)));
		repository.save(new historytransaction(accountno2,"+"+amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0),"received"));
		
		pay1.setBalance(pay1.getBalance()-amount);
		System.out.println(pay1.getBalance());
		historyrepo.save(new transferhistory(accountno1,amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"Transfer"));
		repository.save(new historytransaction(accountno1,"-"+amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"transfer"));
		repository.save(new historytransaction(accountno2,"+"+amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0),"transfer"));
		bankrepo.save(new Banktransfers(accountno1,"+"+amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"transfer"));
		
		repo.save(pay1);
		repo.save(pay2);
		return "Payment successfull";
		}
		
		
	}
	
	@GetMapping("/getbanktransfers/{accountno}")
	public List<Banktransfers> getbanks(@PathVariable String accountno) {
		return bankrepo.findAll().stream().filter(pay -> pay.getAccountno().equals(accountno)).collect(Collectors.toList());
	}
	
	@GetMapping("/getupi/{accountno}")
	public payment getpayment(@PathVariable String accountno) {
		return repo.findById(accountno).get();
	}
	
	@GetMapping("/getbalance/{accountno}")
	public double getbalance(@PathVariable String accountno) {
		return repo.findById(accountno).get().getBalance();
	}
	
	
	@GetMapping("/getname/bank/{accountno}")
	public String getnamebank(@PathVariable String accountno) {
		if(repo.existsById(accountno)) {
		payment pay=repo.findById(accountno).get();
		return pay.getName();
		}else {
			return "Account doesn't exist";
		}
	}
	
	
	@GetMapping("/upi/{upiid}/{accountno}/{amount}")
	public String getupi(@PathVariable String upiid, @PathVariable String accountno, @PathVariable double amount) {
		payment pay1=repo.findById(accountno).get();
		if(pay1.getBalance() < amount) {
			return "Insufficient fund";
		}else {
		System.out.println(pay1.getBalance());
		payment pay2 = repo.findAll().stream().filter(pay->pay.getUpiid().equals(upiid)).findFirst().get();
		pay1.setBalance(pay1.getBalance()-amount);
		
		pay2.setBalance(pay2.getBalance()+amount);
		System.out.println(pay2.getBalance());
		LocalDateTime time = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
		int hour = time.getHour();
		int minute=time.getMinute();
		String time2=hour+":"+minute;
		receivedrepo.save(new receivedtransactions(pay2.getAccountno(),amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0)));
		repository.save(new historytransaction(pay2.getAccountno(),"+"+amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0),"received"));
		historyrepo.save(new transferhistory(pay1.getAccountno(),amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"Transfer"));
		repository.save(new historytransaction(pay1.getAccountno(),"-"+amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"transfer"));
		
		
		repo.save(pay1);
		repo.save(pay2);
		return "Payment successfull";
		}
	}
	
	@GetMapping("/getname/upi/{upiid}")
	public String getupiname(@PathVariable String upiid) {
		
		boolean bool = repo.existsByUpiid(upiid);
		if(bool) {
			payment pay=repo.findAll().stream().filter(pay1->pay1.getUpiid().equals(upiid)).findFirst().get();
			return pay.getName();
		}else {
			return "Upi id doesn't exist";
		}
	}
	
	
	@GetMapping("/mobile/{phoneno}/{accountno}/{amount}")
	public String getmobilepayment(@PathVariable String phoneno, @PathVariable String accountno, @PathVariable double amount) {
		payment pay1=repo.findById(accountno).get();
		if(pay1.getBalance()<amount) {
			return "Insufficient fund   ❌";
		}else {
		payment pay2=repo.findAll().stream().filter(pay->pay.getPhoneno().equals(phoneno)).findFirst().get();
		pay1.setBalance(pay1.getBalance()-amount);
		pay2.setBalance(pay2.getBalance()+amount);
		LocalDateTime time = LocalDateTime.now(ZoneId.of("Asia/Kolkata"));
		int hour = time.getHour();
		int minute=time.getMinute();
		String time2=hour+":"+minute;
		receivedrepo.save(new receivedtransactions(pay2.getAccountno(),amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0)));
		repository.save(new historytransaction(pay2.getAccountno(),"+"+amount,pay1.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay1.getName().charAt(0),"received"));
		historyrepo.save(new transferhistory(pay1.getAccountno(),amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"Transfer"));
		repository.save(new historytransaction(pay1.getAccountno(),"-"+amount,pay2.getName(),time.getMonth().toString(),time.getDayOfMonth(),time.getYear(),time2,pay2.getName().charAt(0),"transfer"));
		repo.save(pay1);
		repo.save(pay2);
		return "Payment successfull ✔";
		}
	}
	
	@GetMapping("/getname/mobile/{phoneno}")
	public String getmobilename(@PathVariable String phoneno) {
		if(repo.existsByPhoneno(phoneno)) {
			 return repo.findAll().stream().filter(pay->pay.getPhoneno().equals(phoneno)).findFirst().get().getName();
		}else {
			return "Mobile number is not linked with bank";
		}
	}
	
	@GetMapping("/gethistory/received/{accountno}")
	public List<receivedtransactions> getlistreceived(@PathVariable String accountno){
		return receivedrepo.findAll().stream().filter(pay->pay.getAccountno().equals(accountno)).toList();
	}
	
	@GetMapping("/gethistory/transactions/{accountno}")
	public List<Object> getlist(@PathVariable String accountno){
		List<receivedtransactions> list1= receivedrepo.findAll().stream().filter(pay->pay.getAccountno().equals(accountno)).toList();
		List<transferhistory> list2 = historyrepo.findAll().stream().filter(pay->pay.getAccountno().equals(accountno)).toList();
		List<Object> list = new ArrayList<Object>(Arrays.asList(list1));
		List<Object> listt = new ArrayList<Object>(Arrays.asList(list2));
		list.addAll(listt);
		System.out.println(list);
		return list;
		
		
	}
	
	@GetMapping("/gethistory/{accountno}")
	public List<historytransaction> getlisthistory(@PathVariable String accountno){
		
		return repository.findAll().stream().filter(pay->pay.getAccountno().equals(accountno)).toList();
		
	}
	
	@GetMapping("/getreceived/{accountno}")
	public List<historytransaction> getreceived(@PathVariable String accountno){
		return repository.findAll().stream().filter(pay->pay.getAccountno().equals(accountno) && pay.getTransactiontype().equals("received")).toList();
	}
	

}
