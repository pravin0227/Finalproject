import { Alert, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import axios from 'axios'

const Historytransactions = ({navigation,route}) => {
    const colordata=['#a7c1eb','#81f772','#e8c268','#f084ec','#ff5c7c','#fcb7b3'];
   const [bool, setbool] = useState(false) 
   
const {accountno} = route.params
    const [historytransactions, sethistorytransactions] = useState("")

    useEffect(() => {
        axios.get(`http://192.168.43.81:8084/payment/gethistory/${accountno}`)
        .then((response)=>{
        //
          sethistorytransactions(response.data);
          
        
        })      
        .catch((error)=>{
            console.log(error);
        }) 
    }, [])
    

    const datatrans=[
        {
            "accountno": "190031",
            "amount": "-10000.0",
            "name": "Pramod",
            "monthnumber": "NOVEMBER",
            "day": 27,
            "year": 2022,
            "time": "23:22",
            "transactiontype": "transfer"
        },
            ];

const header =()=>{
    
}

  return (
    <View style={{flex:1, backgroundColor:COLORS.white}}>
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

        <Text style={{fontWeight:'bold',marginTop:10,fontSize:25,marginLeft:10}}>Transaction history</Text>
      <FlatList ListHeaderComponent={header} showsVerticalScrollIndicator={false} data={historytransactions} renderItem={(item) => {
                        
                        return (
                        
                            <View style={{backgroundColor:COLORS.white,height:65, width:390,marginLeft:1,marginTop:10}}>
                            <Text style={{fontWeight:'400', marginLeft:100,fontSize:20,marginTop:5}}>{item.item.name}</Text>
                            <Text style={{marginLeft:90,marginBottom:10,color:'gray'}}>{item.item.monthnumber} {item.item.day}, {item.item.year} at {item.item.time}</Text>
                            <Text style={{marginLeft:290,marginBottom:-20,marginTop:-40,color:item.item.transactiontype==='received'?'green':'#d6180b',fontSize:20}}>₹ {item.item.amount}</Text>
                            <View style={[styles.circle,{backgroundColor: colordata[Math.floor(Math.random()*6)],}]}>
                            <Text style={{fontWeight:'bold', fontSize:20,}}>{item.item.letter}</Text>
                            </View>
                            
                            
                            </View>
                        )
                    }} />

        
    </View>
  )
}

export default Historytransactions

const styles = StyleSheet.create({
    scrollH: { height: '90%', 
    elevation: 15, 
    shadowColor: 'darkgrey', 
    width: 170, borderRadius: 20, 
    backgroundColor: '#54B435', 
    marginHorizontal: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center' 
},
scrollH2: { 
   flex:0.01,
   height:70,
   width:100,
   marginBottom:100,
   backgroundColor:COLORS.white 
    
    
    },circle: {
        flex: 1.6,
        
        borderRadius: 100,
        width: 50,

        marginTop:-19,
        marginLeft:10,
        marginBottom:8,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    
    
      },
    

})