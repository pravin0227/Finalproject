import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios, { Axios } from 'axios'

const Payamountbank = ({ navigation, route }) => {
    const { accountno } = route.params
    const {accountno1} = route.params
   const [name, setname] = useState("")
    const [amount, setamount] = useState("")
    useEffect(() => {
      axios.get(`http://192.168.43.81:8084/payment/getname/bank/${accountno1}`)
          .then((response)=>{
          //
           setname(response.data)
         
          })      
          .catch((error)=>{
              console.log(error);
          }) 
    }, [])
    
  const letter = name.charAt(0);
    
  const paying = ()=>{
    axios.get(`http://192.168.43.81:8084/payment/banktransfer/${accountno}/${accountno1}/${amount}`)
          .then((response)=>{
          //
           Alert.alert(response.data);
          navigation.navigate("Tabs",{accountno})
          })      
          .catch((error)=>{
              console.log(error);
          }) 
  }
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: COLORS.white }}>
  
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: "center",
            marginTop: SIZES.padding * 6,
            paddingHorizontal: SIZES.padding * 2
          }}
          onPress={() => navigation.navigate("Tabs", { accountno })}
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
  
        <View style={styles.circle}>
  
          <Text style={{ fontSize: 30, fontWeight: '250' }}>{letter}</Text>
  
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.TextInput}>
            Paying {name}
          </Text>
  
          <TextInput
            style={styles.placeholder}
            placeholder="0"
            placeholderTextColor="grey"
            autoFocus={true}
            color='black'
            keyboardType='number-pad'
            value={amount}
              onChangeText={(amount) => setamount(amount)}
          />
  
          <Text style={{ fontSize: 30, marginLeft: -100, marginTop: -45 }}>₹</Text>
        </View>
  
        <View style={styles.button}>
            <TouchableOpacity style={styles.touch} onPress={()=>paying()}>
              <Text style={{fontSize:25}}>
                Pay {amount}
              </Text>
            </TouchableOpacity>
        </View>
  
      </KeyboardAvoidingView>
  
  
    )
}

export default Payamountbank

const styles = StyleSheet.create({

    circle: {
      flex: 0.2,
      backgroundColor: '#a7c1eb',
      borderRadius: 100,
      width: 80,
      marginTop: 70,
      marginLeft: 160,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  
  
    },
    TextInput: {
      fontSize: 19,
      color: 'black',
      marginTop: 20
  
    },
    placeholder: {
      backgroundColor: 'red',
      marginTop: 30,
      width: 200,
      height: 50,
      marginLeft: 150,
      fontSize: 40,
      backgroundColor: COLORS.white,
  
  
    },
    button:{
      flex:1,
      backgroundColor:COLORS.white,
      
    },
    touch:{
        height: 50,
        backgroundColor: COLORS.gray,
        borderRadius: SIZES.radius / 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        width:180,
        marginLeft:110,
        marginTop:400
    }
  
  })