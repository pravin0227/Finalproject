import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native"
import { Appbar } from "react-native-paper";
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const Home = ({route}) => {
const {accountno} = route.params;
const [name, setname] = useState("")
const [balance, setbalance] = useState("")
    React.useEffect(() => {
        axios.get(`http://192.168.43.81:8082/User/getbyaccountno/${accountno}`)
        .then((response)=>{
        //    
       setname(response.data.name);
                
        
       
        })      
        .catch((error)=>{
            console.log(error);
        }) 

       

        
    }, [])

    const getbalance=()=>{
        axios.get(`http://192.168.43.81:8084/payment/getbalance/${accountno}`)
        .then((response)=>{
        //
         setbalance(response.data);
       
        })      
        .catch((error)=>{
            console.log(error);
        }) 
    }

    
    const featuresData = [
        {
            id: 1,
            icon: icons.scan,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Scan any QR code",
            screenname:"Scan"


        },
        {
            id: 2,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Pay bills",
            screenname:"Paybill"
        },
        {
            id: 3,
            icon: icons.payphone,
            color: COLORS.darkgreen,
            backgroundColor: COLORS.lightGreen,
            description: "Pay number",
            screenname:"Payphone"
        },
        {
            id: 4,
            icon: icons.wallet,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "transactions",
            screenname:"Historytransactions"
        },
        {
            id: 5,
            icon: icons.banktransfer,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Bank transfer",
            screenname:"Banktransfer"
        },
        {
            id: 6,
            icon: icons.selftransfer,
            color: COLORS.darkgreen,
            backgroundColor: COLORS.lightGreen,
            description: "Self transfer",
            screenname:"Maintenance"
        },
        {
            id: 7,
            icon: icons.phone,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Mobile Prepaid",
            screenname:"Maintenance"
        },
        {
            id: 8,
            icon: icons.upiid,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Pay to upi ID",
            screenname:"Payupi"
        },
    ]

    const specialPromoData = [
        {
            id: 1,
            img: images.homeloan2,
            title: "Home Loan",
            description: "Apply Now \nattractive interest rates \nzero processing fees \n starting at 8.45% "
        },
        {
            id: 2,
            img: images.goldloan,
            title: "Gold loan",
            description: "Apply now \nflexible repayment options \n 7% interest rate"
        },
        {
            id: 3,
            img: images.personalloan,
            title: "Personal loan",
            description: "Apply Now \nMost secure  \nBest rates \n starting at 10.75%"
        },
        {
            id: 4,
            img: images.carloan,
            title: "Car loan",
            description: "Apply now \nComplete your dream by choosing us \nat lower interest rates"
        },
    ]

    const [features, setFeatures] = useState(featuresData)
    const [specialPromos, setSpecialPromos] = useState(specialPromoData)

    function renderHeader() {
        const navigation = useNavigation();
        return (
           
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
                <Appbar.Header >
               
               <Text style={{fontSize:20,marginleft:-10}}>Welcome  </Text>
               <Text style={{fontSize:20,fontWeight:'bold',marginleft:15}}>{name}</Text>
               
               <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray,
                            marginLeft:110
                        }}
                        onPress={()=>navigation.navigate("Historytransactions",{accountno})}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary,
                               
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5,
                                marginLeft:200
                                
                            }}
                        >
                        </View>
                    </TouchableOpacity>
                </View>
           </Appbar.Header>
                

                

            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 120,
                }}
            >
                <Image
                    source={images.redbox}
                    resizeMode="cover"
                    style={{
                        width: "105%",
                        height: "100%",
                        borderRadius: 40,
                        position:"absolute",
                        marginleft:10
                        
                    }}
                    
                />
                
                <Text style={styles.textlable}>IDFC FIRST BANK</Text>
                <Text style={styles.textlable2}>Always You First</Text>
                <TouchableOpacity style={{flex:0.89,backgroundColor:'red',marginleft:10,alignItems:'center',marginTop:5,width:300,alignSelf:'center',borderRadius:4,marginTop:10}} onPress={()=>getbalance()}>
                <Text style={{fontWeight:'bold',fontSize:18,marginleft:60,marginTop:10,color:COLORS.white}}>Balance: ₹ {balance}</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

    function renderFeatures({}) {

        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
                
            </View>
        )
        const navigation = useNavigation();
        const renderItem = ({ item }) => (
           
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
                onPress={() => navigation.navigate(item.screenname,{accountno})}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        borderRadius: 20,
                        backgroundColor: item.backgroundColor,
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
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
            </TouchableOpacity>
        )

        return (
            
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        )
    }

    function renderPromos() {

        const HeaderComponent = ({navigation}) => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures({navigation})}
                {renderPromoHeader()}
            </View>
        )

        const renderPromoHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
                </View>
                <TouchableOpacity
                    onPress={() => console.log("View All")}
                >
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
                </TouchableOpacity>
            </View>

        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => console.log(item.title)}
            >
                <View
                    style={{
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={item.img}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "110%",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                    />
                </View>

                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textlable: {
    textAlign:'center',
    textShadowColor:'white',
    fontWeight:'bold',
    fontSize:20,
    marginTop:15,
    color:'white'
    },
    textlable2: {
        textAlign:'center',
        textShadowColor:'white',
        fontWeight:'bold',
        fontSize:13,
        marginTop:10,
        marginTop:2,
        color:'white'
        },
})
export default Home;