import { View, Text, ImageBackground } from 'react-native'
import React from 'react'



const Maintenance = () => {
  return (
    <ImageBackground
    style={{flex:1,height:'100%',width:'100%',position:'absolute'}}
    source={require('../assets/images/maintenance.png')}
    >
        <View style={{flex:1}}>

        <Text style={{fontWeight:'bold',fontSize:24,color:'black',marginTop:70,marginLeft:50}}>Feature Under Maintenance</Text>

        </View>


    
    
    </ImageBackground>
  )
}

export default Maintenance