
import { KeyboardAvoidingView,Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, ToastAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'
const Banktransfer = ({navigation, route}) => {
    const {accountno}=route.params
    const [accountno1, setaccountno1] = useState("")
    const [accountno2, setaccountno2] = useState("")
    const [bool, setbool] = useState(true)
    const [historytransactions, sethistorytransactions] = useState("")
    const colordata=['#a7c1eb','#81f772','#e8c268','#f084ec','#ff5c7c','#fcb7b3'];

    useEffect(() => {
      axios.get(`http://192.168.43.81:8084/payment/getbanktransfers/${accountno}`)
      .then((response)=>{
      //
        sethistorytransactions(response.data);
        
      
      })      
      .catch((error)=>{
          console.log(error);
      }) 
  }, [])

    const getcheck=()=>{
      if(accountno1!==accountno2){
          setbool(false)
          ToastAndroid.show("Re-entered password does not match",ToastAndroid.SHORT);
      }else if(accountno1===accountno){
        ToastAndroid.show("please provide valid account number",ToastAndroid.SHORT);
      }
      else{
        getverified()
      }
    }
    const getverified = ()=>{
    
        axios.get(`http://192.168.43.81:8084/payment/getname/bank/${accountno1}`)
            .then((response)=>{
            //
              if(response.data==="Account doesn't exist"){
                Alert.alert("Account doesn't exist")
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
        navigation.navigate("Payamountbank",{accountno1:accountno1,accountno:accountno})
      }
  return (
    <KeyboardAvoidingView style={{flex:1}}>

    <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{flex:0.36, flexDirection:'row'}}>

        
    <TouchableOpacity
                style={{
                    
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
            <Text style={{color:'black',marginTop:53,fontSize:23}}> Enter recipient details</Text>
            </View>

            

            <TextInput
            style={styles.TextInput}
            placeholder='Account number'
            placeholderTextColor="grey"
            
            maxLength={6}
            keyboardType='number-pad'
            value={accountno1}
            onChangeText={(accountno1) => setaccountno1(accountno1)}
            
           
          />

            <TextInput
            style={styles.TextInput1}
            
            placeholderTextColor="grey"
            placeholder='Re-enter account number'
            color='black'
            keyboardType='number-pad'
            value={accountno2}
            onChangeText={(accountno2) => setaccountno2(accountno2)}
            
           
          />

<TextInput
            style={styles.TextInput1}
            
            placeholderTextColor="grey"
            placeholder='IFSC'
            color='black'
            maxLength={10}
            
           
          />

<TextInput
            style={styles.TextInput1}
            
            placeholderTextColor="grey"
            placeholder='Recipient name'
            color='black'
           
            
           
          />

<TouchableOpacity
                    style={{
                        height: 40,
                        backgroundColor: COLORS.gray,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:350,
                       marginLeft:20,
                        marginTop:20
                    }}
                    onPress={() =>getcheck()}
                ><Text>Continue</Text></TouchableOpacity>

                <Text style={{color:'gray',fontSize:15,padding:5,marginLeft:8}}>
                    This information will be securely saved as per Idfc first bank Terms of Service and Privacy Policy.
                </Text>

                <Text style={{fontSize:18, marginTop:10,marginLeft:8}}>
                    Recent Bank Transfers
                </Text>

                <FlatList horizontal={true} showsHorizontalScrollIndicator={false} data={historytransactions} renderItem={(item) => {
                        
                        return (
                        
                          <View style={{flex:0.5,backgroundColor:COLORS.white,width:110,alignContent:'center',alignItems:'center'}}>

                          <TouchableOpacity style={[styles.circle,{backgroundColor: colordata[Math.floor(Math.random()*6)],}]}>
                            <Text style={{fontSize:40,fontWeight:'bold'}}>{item.item.letter}</Text>
                          </TouchableOpacity>
                          <Text style={{fontSize:19,color:'black',marginTop:10}}>{item.item.name}</Text>
        
                        </View>
                            
                            
                        )
                    }} />
                
                




    </View>


    </KeyboardAvoidingView>
  )
}

export default Banktransfer

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:40,
        paddingLeft:20,
        borderWidth:1,
        width:350,
        marginLeft:20,
        color:COLORS.black,
        fontSize:20,
        borderRadius:5,
        
        
        backgroundColor:COLORS.white
      },
      TextInput1: {
        height: 50,
        marginTop:30,
        paddingLeft:20,
        borderWidth:1,
        width:350,
        marginLeft:20,
        color:COLORS.black,
        fontSize:20,
        borderRadius:5,
        
        
        backgroundColor:COLORS.white
      },
      circle: {
        flex: 0.33,
               
         borderRadius: 100,
        
          width: 80,

          marginTop:10,
          marginLeft:10,
        
         alignContent: 'center',
          justifyContent: 'center',
        alignItems: 'center'
    
    
      },

})