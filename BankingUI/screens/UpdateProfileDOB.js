import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const UpdateProfileDOB = ({navigation,route}) => {
    const {accountno}=route.params

    const [name, setname] = useState("")
  const [pan, setpan] = useState("")
  const [dob, setdob] = useState("")
  const [phoneno, setphoneno] = useState("")
  const [email, setemail] = useState("")
  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [pincode, setpincode] = useState("")
  

  

  const getverified=()=>{
    if(dob.length===""){
        ToastAndroid.show("Please provide the fields",ToastAndroid.LONG)
    }else{
      update()
    }
  }
    const update = ()=>{
      console.log(dob);
      axios.put(`http://192.168.43.81:8083/user/updatedob/${dob}/${accountno}`)
          .then((response)=>{
          //    
            ToastAndroid.show(response.data,ToastAndroid.LONG);
            navigation.navigate("Tabs",{
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
                      Enter you Birth-date
                  </Text>
                  <Text style={{ marginLeft:140}}>We will wish you on</Text>
                  
                  <TextInput
              style={styles.TextInput}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="grey"
              autoFocus={true}
              color='black'
              value={dob}
            onChangeText={(dob) => setdob(dob)}
              
             
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

export default UpdateProfileDOB

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:30,
        paddingLeft:45,
        borderWidth:1,
        width:280,
        marginLeft:60,
        color:COLORS.black,
        fontSize:30,
        
        
        backgroundColor:COLORS.white
      },
})