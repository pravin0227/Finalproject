import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const UpdateProfileAddress = ({navigation,route}) => {
    const {accountno}=route.params
    const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [pincode, setpincode] = useState("")

  const getverified=()=>{
    if(city==="" || state==="" || pincode===""){
        ToastAndroid.show("Please provide all the fields",ToastAndroid.LONG)
    }else{
      console.log("inside else")
      update()
    }
  }

  const update = ()=>{
    
    axios.put(`http://192.168.43.81:8083/user/updateaddress/${city}/${state}/${pincode}/${accountno}`)
        .then((response)=>{
        //
          
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
           <Text style={{fontWeight:'bold',fontSize:19, marginLeft:60,marginTop:30}}>
                    Enter your Permanent address
                </Text>
                <Text style={{ marginLeft:76}}></Text>
                
                <TextInput
            style={styles.TextInput}
            placeholder="City"
            placeholderTextColor="grey"
            autoFocus={true}
            color='black'
            maxLength={10}
            value={city}
            onChangeText={(city) => setcity(city)}
           
          />
          <TextInput
            style={styles.TextInput}
            placeholder="State"
            placeholderTextColor="grey"
            
            color='black'
            maxLength={10}
            value={state}
            onChangeText={(state) => setstate(state)}
           
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Pincode"
            placeholderTextColor="grey"
            keyboardType='number-pad'
            color='black'
            maxLength={6}
            value={pincode}
            onChangeText={(pincode) => setpincode(pincode)}
           
          />

<TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: COLORS.gray,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:180,
                        marginLeft:90,
                        marginTop:20
                    }}
                    onPress={() =>getverified()}
                ><Text>Update</Text></TouchableOpacity>
    </View>
  )
}

export default UpdateProfileAddress

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:30,
        paddingLeft:20,
        borderWidth:1,
        width:280,
        marginLeft:50,
        color:COLORS.black,
        fontSize:25,
        
        
        backgroundColor:COLORS.white
      },
})