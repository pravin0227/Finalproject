import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'


const Update = ({navigation,route}) => {
  const {accountno} = route.params;
  const [name, setname] = useState("")
  const [pan, setpan] = useState("")
  const [dob, setdob] = useState("")
  const [phoneno, setphoneno] = useState("")
  const [email, setemail] = useState("")
  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [pincode, setpincode] = useState("")
  const [upiid, setupiid] = useState("")
      React.useEffect(() => {
          axios.get(`http://192.168.43.81:8083/user/getbyaccountno/${accountno}`)
          .then((response)=>{
          //    
         setname(response.data.name);
         setpan(response.data.pan);
         setdob(response.data.dob);
         setphoneno(response.data.phoneno);
         setemail(response.data.email);
         setcity(response.data.city);
         setstate(response.data.state);
         setpincode(response.data.pincode);
         setupiid(response.data.upiid)         
         ToastAndroid.show("Enter proper email",ToastAndroid.SHORT);
         
          })      
          .catch((error)=>{
              console.log(error);
              
          }) 
      }, [])
    
    
  return (
    <View style={{flex:1,backgroundColor:'#fff5f6'}}>
              <Appbar.Header style={{backgroundColor:'#b01a20',height:50}}>
               
                <Appbar.Action icon="less-than" onPress={() => navigation.navigate("Tabs",{accountno})} />
                <Text style={{color:COLORS.white,fontSize:20}}> Edit Profile</Text>

                
                
            </Appbar.Header>
            <Text style={{color:'gray',marginTop:5,fontSize:15}}> Personal Information </Text>
            <View style={{flex:0.29,backgroundColor:COLORS.white,marginTop:10,margin:6}}>
            <Image
                    source={icons.edituser}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: COLORS.black,
                        marginTop:15,
                        marginLeft:7
                    }}
                /> 
                <Text style={{fontSize:13,marginLeft:50,marginTop:-35}}>{name} : {upiid}</Text>
                
                  <View style={{flex:0.01,backgroundColor:'black',width:320,marginTop:6,marginLeft:50}}></View>

                  <Text style={{marginLeft:50,marginTop:10,fontSize:13}}>Permanent Account Number</Text> 
                  <Image
                    source={icons.editpassbook}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        
                        marginTop:-2,
                        marginLeft:7
                    }}
                />  
                <Text style={{marginLeft:50,marginTop:-30}}>{pan}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("UpdateProfile",{accountno})}>
                  <Text style={{marginLeft:340,marginTop:-20,color:'red'}}>edit</Text>
                </TouchableOpacity>

                <View style={{flex:0.01,backgroundColor:'black',width:320,marginTop:28,marginLeft:50}}></View>

                <Text style={{marginLeft:50,marginTop:8,fontSize:13}}>Date of Birth</Text> 
                  <Image
                    source={icons.calendar}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        
                        marginTop:-2,
                        marginLeft:7
                    }}
                />  
                <Text style={{marginLeft:50,marginTop:-25}}>{dob}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("UpdateProfileDOB",{accountno})}>
                  <Text style={{marginLeft:340,marginTop:-20,color:'red'}}>edit</Text>
                </TouchableOpacity>
            </View>
          <Text style={{color:'gray',fontSize:15,marginLeft:5}}>Mobile Number</Text>
          <View style={{flex:0.12,backgroundColor:COLORS.white,marginTop:5}}>
          <Text style={{marginLeft:50,marginTop:8,fontSize:13}}>Primary Mobile Number</Text> 
                  <Image
                    source={icons.editcall}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        
                        marginTop:-2,
                        marginLeft:10
                    }}
                />  
                <Text style={{marginLeft:50,marginTop:-25}}>{phoneno}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("UpdateProfilenumber",{accountno})}>
                  <Text style={{marginLeft:340,marginTop:-20,color:'red'}}>edit</Text>
                </TouchableOpacity>
          </View>
          <Text style={{color:'gray',fontSize:15,marginLeft:5}}>Email ID</Text>
          <View style={{flex:0.12,backgroundColor:COLORS.white,marginTop:5}}>
          <Text style={{marginLeft:50,marginTop:8,fontSize:13}}>Primary Email Address</Text> 
                  <Image
                    source={icons.editemail}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        
                        marginTop:-2,
                        marginLeft:10
                    }}
                />  
                <Text style={{marginLeft:50,marginTop:-25}}>{email}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("UpdateProfileemail",{accountno})}>
                  <Text style={{marginLeft:340,marginTop:-20,color:'red'}}>edit</Text>
                </TouchableOpacity>
          </View>
          
          <Text style={{color:'gray',fontSize:15,marginLeft:5}}>Saved Address</Text>
          <View style={{flex:0.2,backgroundColor:COLORS.white,marginTop:5}}>
            
          <Text style={{marginLeft:50,marginTop:8,fontSize:13}}>Primary Address</Text> 
                  <Image
                    source={icons.edithome}
                    resizeMode="contain"
                    style={{
                        width: 35,
                        height: 35,
                        
                        marginTop:10,
                        marginLeft:10
                    }}
                />  
                <Text style={{marginLeft:50,marginTop:-40}}>City :         {city}</Text>
                <Text style={{marginLeft:50}}>State :      {state}</Text>
                <Text style={{marginLeft:50}}>Pincode : {pincode}</Text>
                
                <TouchableOpacity onPress={()=>navigation.navigate("UpdateProfileAddress",{accountno})}>
                  <Text style={{marginLeft:340,marginTop:-35,color:'red'}}>edit</Text>
                </TouchableOpacity>

          </View>
          
                    
         <View style={{flex:0.27,backgroundColor:'#fff5f6',marginTop:5,}}>
          
                    
                  <TouchableOpacity style={{backgroundColor:'#b01a20',alignSelf:'center',borderRadius:30,marginTop:90}} onPress={()=>navigation.navigate("Tabs",{accountno})}>
                    <Text style={{fontSize:20,fontWeight:'600',margin:10,marginHorizontal:50,color:COLORS.white}}>got to home page</Text>
                  </TouchableOpacity>
         </View>

    </View>

  )
}

export default Update

const styles = StyleSheet.create({
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flex:0.02,
    marginTop:10,
    backgroundColor: "#9b1c29",
    marginBottom:20
  },
})