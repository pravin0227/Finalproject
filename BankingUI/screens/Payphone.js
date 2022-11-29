import { Alert, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const Payphone = ({navigation, route}) => {
  const accountno = route.params.accountno
const [phoneno, setphoneno] = useState("")
const [phoneno1, setphoneno1] = useState("")
const [name, setname] = useState("")
const [upiid1, setupiid1] = useState("")
useEffect(() => {
 
  axios.get(`http://192.168.43.81:8084/payment/getupi/${accountno}`)
        .then((response)=>{
        //
          setphoneno1(response.data.phoneno)
       
        })      
        .catch((error)=>{
            console.log(error);
        }) 
  

}, [])

const getcheck=()=>{
  if(phoneno==="" || phoneno.length!==10 || phoneno===phoneno1){
      
      ToastAndroid.show("Please provide valid number",ToastAndroid.SHORT);
  }else{
    getverified()
  }
}

  const getverified = ()=>{
    
    axios.get(`http://192.168.43.81:8084/payment/getname/mobile/${phoneno}`)
        .then((response)=>{
        //
          if(response.data==="Mobile number is not linked with bank"){
            ToastAndroid.show("Mobile number is not linked with bank",ToastAndroid.SHORT)
          }else{
            setname(response.data.name)
            navigatevalue();
            console.log("in else")
          }
       
        })      
        .catch((error)=>{
            console.log(error);
        }) 

        
  }

  const navigatevalue=()=>{
    navigation.navigate("Payamount",{phoneno:phoneno,accountno:accountno})
  }

  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      
      <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => navigation.navigate("Tabs",{accountno})}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.black
                    }}
                />

                
            </TouchableOpacity>

            
                <Text style={{fontWeight:'bold',fontSize:19, marginLeft:20,marginTop:30}}>
                    Enter phone number
                </Text>
                <Text style={{ marginLeft:17}}> Pay someone using a upi verified number</Text>
                
                <TextInput
            style={styles.TextInput}
            placeholder="00000 00000"
            placeholderTextColor="grey"
            keyboardType="number-pad"
            color='black'
            maxLength={10}
            value={phoneno}
            onChangeText={(phoneno) => setphoneno(phoneno)}
           
          />

                  <Image
                    source={icons.user2}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.black,
                        marginLeft:360,
                        marginTop:-35
                    }}
                />
                <TextInput
                style={styles.TextInput2}
                placeholder="+91"
                placeholderTextColor="black"
                keyboardType="number-pad"
                color='black'
                
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
                    onPress={() => getcheck()}
                ><Text>Continue</Text></TouchableOpacity>

               
                
            </View>
            
      
    
  )
}

export default Payphone

const styles = StyleSheet.create({
    TextInput: {
    height: 50,
    marginTop:30,
    paddingLeft:20,
    borderWidth:1,
    width:280,
    marginLeft:76,
    color:COLORS.black,
    fontSize:30,
    
    
    backgroundColor:COLORS.white
  },
  TextInput2: {
    height: 50,
    marginTop:-35,
    
    borderWidth:1,
    width:50,
    marginLeft:22,
    color:COLORS.black,
    fontSize:26,
    
    
    backgroundColor:COLORS.white
  }

})