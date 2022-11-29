import { StatusBar } from "expo-status-bar";
import React, {  useRef, useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import axios from "axios";



const Resetpass = ({ navigation }) => {
    
    
    const [email, setemail] = useState("");
    const [accountno, setaccountno] = useState("");
    const [password, setpassword] = useState("");
    const [cppassword, setcppassword] = useState("");
    
    
    const checkpassword=()=>{
        if(password===cppassword){
            updatepassword();
        }else{
            ToastAndroid.show("password does not mathches with confirm password",ToastAndroid.LONG);
        }
    }
    
    const updatepassword=()=>{
        
        axios.put(`http://192.168.43.81:8082/User/updatepas/${email}/${accountno}/${password}`)
         .then((response)=>{
         //
         ToastAndroid.show(response.data,ToastAndroid.LONG); 
         if(response.data==="password updated successfully"){
            navigation.navigate("Login")
         }
         
         })      
         .catch((error)=>{
             console.log(error);
         })     
        
       }



    return (
    
        <KeyboardAvoidingView style={{flex:1,backgroundColor:'#fff'}}>
           
            
           <View style={{backgroundColor:'#ded1d1',flex:0.3,borderBottomEndRadius:50,borderBottomStartRadius:50,paddingTop:50}}>
            <Image style={styles.image} source={require("../assets2/download.png")} />
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:28, margin:49}}>Reset Passoword</Text>
            </View>
            <View >
            <Text style={{fontWeight:'bold', fontSize:28, margin:12}}>Build strong passkey</Text>
           
            <View style={{backgroundColor:'#fff',alignItems:'center',top:10}}>
            <View style={[styles.inputView,{marginBottom:1}]}>
         
          <TextInput
            style={styles.TextInput}
            placeholder="Enter account number"
            placeholderTextColor="#003f5c"
            keyboardType="number-pad"
            require
            value={accountno}
            onChangeText={(accountno) => setaccountno(accountno)}
          />
          
        </View>
        <View style={[styles.inputView,{marginBottom:1}]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your linked email address"
            placeholderTextColor="#003f5c"
            keyboardType="email-address"
            require
            value={email}
            onChangeText={(email) => setemail(email)}
          />
          
        </View>
        <View style={[styles.inputView,{marginBottom:1}]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter new password"
            placeholderTextColor="#003f5c"
            
            require
            value={password}
            onChangeText={(password) => setpassword(password)}
          />
          
        </View>
        <View style={[styles.inputView,{marginBottom:1}]}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm password"
            placeholderTextColor="#003f5c"
            
            require
            value={cppassword}
            onChangeText={(cppassword) => setcppassword(cppassword)}
          />
          
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={checkpassword}>
                <Text style={{color:'white',fontWeight:'bold', fontSize:18, margin:2}}>Confirm</Text>
            </TouchableOpacity>
            
            <Image style={styles.image1} source={require("../assets2/paymentlogo1.png")} />

    

            </View>
             

            </View>
                
    
                
            
            </View>
            
           
        </KeyboardAvoidingView>
    
      )
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#de6262",
          alignItems: "center",
          justifyContent: "center",
        },
        container1: {
          flex: 1,
          backgroundColor: "#de6262",
          
          justifyContent: "center",
        },
       
        image: {
          marginTop:20,
          resizeMode:'cover',
          height:70,
          width:200,
          
          marginBottom:10
    
        },
       
        inputView: {
            backgroundColor: "#fff",
            borderRadius: 10,
            width: "70%",
            height: 45,
            marginBottom: 30,
            marginTop:30,
              textAlign:'center',
            alignItems: "center",
            borderWidth:2
        },
       
        TextInput: {
          height: 50,
          flex: 1,
          padding: 10,
          marginLeft: 20,
        },
       
        forgot_button: {
          height: 30,
          marginBottom: 30,
        },
        image1: {
          marginTop:-5,
          resizeMode:'cover',
          height:240,
          width:400,
          
          marginBottom:20
    
        },
       
        loginBtn: {
            width: "50%",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            backgroundColor: "#9c343c",
        },
        checkboxcontainer:{
          marginBottom: 100,
          color: 'red',
        },
      });

export default Resetpass;