import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const Paybill = ({navigation,route}) => {
    const accountno = route.params
    const bills=[

        {
            id:1,
            title:"Mobile Recharge",
            icon:icons.mobile
        },
        {
            id:2,
            title:"Electricity",
            icon:icons.lightning
        },
        {
            id:3,
            title:"Fastag recharge",
            icon:icons.car
        },
        {
            id:4,
            title:"Google Play",
            icon:icons.googleplay
        },
        {
            id:5,
            title:"Credit card bill payment",
            icon:icons.credit
        },
        {
            id:6,
            title:"DTH / cable TV",
            icon:icons.smarttv
        },
        {
            id:7,
            title:"Gas cylinder booking",
            icon:icons.gas
        },
        {
            id:8,
            title:"Postpaid mobile",
            icon:icons.payphone
        },
        {
            id:9,
            title:"Broadband / Landline",
            icon:icons.router
        },
        

    ]
    const Header=()=>(      
        <View style={{ marginBottom: SIZES.padding * 2,flex:1,marginTop:-10 }}>
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

                <Text style={{ ...FONTS.h3,marginTop:50,marginLeft:10 }}>Payment categories</Text>
        </View>
    )
    const renderItem = ({ item }) => (
           
        <TouchableOpacity
            style={[{ marginBottom: SIZES.padding * 2, width: 110, alignItems: 'center' ,borderWidth:1,borderRadius:5,margin:8,borderWidth: 1,
            borderRadius: 20,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: COLORS.white,
            shadowOffset: { width: 3, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 5,}]}
            // onPress={() => navigation.navigate(item.screenname,{accountno})}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    marginBottom: 5,
                    borderRadius: 20,
                    backgroundColor:'lightred' ,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: item.color
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.title}</Text>
        </TouchableOpacity>
    )
    const [billsdata, setbillsdata] = useState(bills)
  return (
    <FlatList
    ListHeaderComponent={Header}
    data={billsdata}
    numColumns={3}
    columnWrapperStyle={{ justifyContent: 'space-between' }}
    keyExtractor={item => `${item.id}`}
    renderItem={renderItem}
    style={{ marginTop: SIZES.padding * 2 }}
/>
  )
}

export default Paybill

const styles = StyleSheet.create({})