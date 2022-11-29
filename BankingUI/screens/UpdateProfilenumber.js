import { View, Text, TouchableOpacity,StyleSheet, Image, ScrollView, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const UpdateProfilenumber = ({navigation,route}) => {
    const {accountno}=route.params

  const [phoneno, setphoneno] = useState("")

  const getverified=()=>{
    if(phoneno.length!==10){
        ToastAndroid.show("Invalid number",ToastAndroid.LONG)
    }else{
      update()
    }
  }

  const update = ()=>{
    console.log(phoneno);



    axios.put(`http://192.168.43.81:8083/user/updatenumber/${phoneno}/${accountno}`)
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
           <Text style={{fontWeight:'bold',fontSize:19, marginLeft:76,marginTop:30}}>
                    Enter you number
                </Text>
                <Text style={{ marginLeft:76}}> we will reach you at</Text>
                
                <TextInput
            style={styles.TextInput}
            placeholder="00000 00000"
            placeholderTextColor="grey"
            autoFocus={true}
            color='black'
            maxLength={10}
            keyboardType='number-pad'
            value={phoneno}
            onChangeText={(phoneno) => setphoneno(phoneno)}
            
           
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
                    onPress={() =>{ 
                      getverified();
                      
                    
                }}
                ><Text>Update</Text></TouchableOpacity>
    </View>
  )
}

export default UpdateProfilenumber

const styles = StyleSheet.create({
    TextInput: {
        height: 50,
        marginTop:30,
        paddingLeft:20,
        borderWidth:1,
        width:280,
        marginLeft:50,
        color:COLORS.black,
        fontSize:36,
        
        
        backgroundColor:COLORS.white
      },
})