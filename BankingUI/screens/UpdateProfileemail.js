import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const UpdateProfileemail = ({navigation,route}) => {
    const {accountno}=route.params
 
  const [email, setemail] = useState("")

  const getverified=()=>{
    if(email===""){
        ToastAndroid.show("Please provide the field",ToastAndroid.LONG)
    }else{
      update()
    }
  }

    const updateinonboarding = ()=>{
        axios.put(`http://192.168.43.81:8082/User/updatepass/${email}/${accountno}`)
    .then((response)=>{
    //    
        console.log("in onboarding") 
    console.log("entering in useeffect")
   
    })      
    .catch((error)=>{
        console.log(error);
    }) 
        
    }
    const update = ()=>{
      console.log(email);
      axios.put(`http://192.168.43.81:8083/user/updatemail/${email}/${accountno}`)
          .then((response)=>{
          //
            updateinonboarding();
           ToastAndroid.show(response.data,ToastAndroid.LONG);
           navigation.navigate("Update",{
            accountno
        })
          })      
          .catch((error)=>{
              console.log(error);
          }) 
    }

    return (
      <View style={{flex:1,backgroundColor:'#fff5f6'}}>
        <Appbar.Header style={{backgroundColor:'#b01a20',height:50}}>
                 
                 <Appbar.Action icon="less-than" onPress={() => navigation.navigate("Update",{accountno})} />
                 <Text style={{color:COLORS.white,fontSize:20}}> Update Profile</Text>
               
                 
             </Appbar.Header>
             <Text style={{fontWeight:'bold',fontSize:19, marginLeft:115,marginTop:30}}>
                      Enter your email ID
                  </Text>
                  <Text style={{ marginLeft:140}}>we will verify you</Text>
                  
                  <TextInput
              style={styles.TextInput}
              placeholder=""
              placeholderTextColor="grey"
              autoFocus={true}
              color='black'
              value={email}
            onChangeText={(email) => setemail(email)}
             
              
             
            />
  
  <TouchableOpacity
                      style={{
                          height: 50,
                          backgroundColor: COLORS.gray,
                          borderRadius: SIZES.radius / 1.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width:180,
                          marginLeft:110,
                          marginTop:20
                      }}
                      onPress={() =>{ 
                        getverified();
                        
                      
                  }}
                  ><Text>Update</Text></TouchableOpacity>
      </View>
    )
}

export default UpdateProfileemail

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:30,
      
        borderWidth:1,
        width:280,
        marginLeft:60,
        color:COLORS.black,
        fontSize:20,
        
        
        backgroundColor:COLORS.white
      },
})