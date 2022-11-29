import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const UpdateProfile = ({navigation,route}) => {
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
      if(pan.length!==10){
          ToastAndroid.show("Invalid pan number",ToastAndroid.LONG)
      }else{
        update()
      }
    }

    
    const update = ()=>{
      console.log(pan);
      axios.put(`http://192.168.43.81:8083/user/updatepan/${pan}/${accountno}`)
          .then((response)=>{
          //    
           ToastAndroid.show(response.data,ToastAndroid.SHORT);
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
           <Text style={{fontWeight:'bold',fontSize:19, marginLeft:76,marginTop:30}}>
                    Enter your pan number
                </Text>
                <Text style={{ marginLeft:76}}> valid pan will never offend you</Text>
                
                <TextInput
            style={styles.TextInput}
            placeholder="GGVPM 7409A"
            placeholderTextColor="grey"
            autoFocus={true}
            color='black'
            maxLength={10}
            value={pan}
            onChangeText={(pan) => setpan(pan)}
            
           
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
                    onPress={() =>{ getverified();
                       
                    
                }}
                ><Text>Update</Text></TouchableOpacity>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:30,
        paddingLeft:20,
        borderWidth:1,
        width:280,
        marginLeft:50,
        color:COLORS.black,
        fontSize:30,
        
        
        backgroundColor:COLORS.white
      },
})