import { KeyboardAvoidingView,Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const Payupi = ({navigation,route}) => {
    const {accountno}=route.params
    const [upiid, setupiid] = useState("")
    const [upiid1, setupiid1] = useState("")

    useEffect(() => {
 
      axios.get(`http://192.168.43.81:8084/payment/getupi/${accountno}`)
            .then((response)=>{
            //
              setupiid1(response.data.upiid)
           
            })      
            .catch((error)=>{
                console.log(error);
            }) 
      
    
    }, [])

    const getcheck=()=>{
      if(upiid==="" || upiid===upiid1){
          
          ToastAndroid.show("Please provide valid field",ToastAndroid.SHORT);
      }else{
        paying()
      }
    }
    const paying = ()=>{
    
        axios.get(`http://192.168.43.81:8084/payment/getname/upi/${upiid}`)
            .then((response)=>{
            //,
              if(response.data==="Upi id doesn't exist"){
                ToastAndroid.show("Upi id doesn't exist",ToastAndroid.SHORT)
              }else{
                console.log(response.data)
                navigatevalue();
                console.log("in else")
              }
           
            })      
            .catch((error)=>{
                console.log(error);
            }) 
      }
    
      const navigatevalue=()=>{
        navigation.navigate("Payamountupi",{upiid:upiid,accountno:accountno})
      }

  return (
    <KeyboardAvoidingView style={{flex:1}}>
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
                    Pay to UPI ID
                </Text>
                
                <TextInput
            style={styles.TextInput}
            value={upiid}
            onChangeText={(upiid) => setupiid(upiid)}
            
           
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
                    onPress={() =>getcheck()}
                ><Text>Continue</Text></TouchableOpacity>
                <View style={{flex:0.04, backgroundColor:COLORS.white,width:80,alignItems:'center',justifyContent:'center',
                    marginTop:-132, marginLeft:30
            }}>
                    <Text style={{fontSize:10,fontWeight:'bold'}}>ENTER UPI ID</Text>
                </View>
                
            </View>
            </KeyboardAvoidingView>
  )
}

export default Payupi

const styles = StyleSheet.create({
    TextInput: {
    height: 50,
    marginTop:30,
    paddingLeft:10,
    borderWidth:1,
    width:350,
    marginLeft:20,
    color:COLORS.black,
    fontSize:18,
    
    
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