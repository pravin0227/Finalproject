import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Card } from 'react-native-paper'
import { COLORS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'





const Userprofile = ({ navigation, route }) => {
    const { accountno } = route.params
    const [name, setname] = useState("")
    React.useEffect(() => {
        axios.get(`http://192.168.43.81:8083/user/getbyaccountno/${accountno}`)
            .then((response) => {
                //    
                setname(response.data.name);

                console.log("entering in useeffect")

            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const preoffersdata = [{ model: images.banner }, { model: images.homeloan }, { model: images.carloan }, { model: images.personalloan }, { model: images.goldloan },]


    useEffect(() => {
        console.log("inside userprofile" + accountno)

    },)
    const functionedit = () => {


    }

    const myrelations = [{ relationtype: 'home loan', nextemi: 12000, availlimit: 200300 }, { relationtype: 'gold loan', nextemi: 6700, availlimit: 560980 }, { relationtype: 'car loan', nextemi: 56000, availlimit: 200900 }]
    const transactionhistory = [{
        trasactiontype: 'Deposit'

    }, {
        trasactiontype: 'Transfer'

    }, {
        trasactiontype: 'Withdraw'

    },]
    const preoffer = [images.banner, images.carloan, images.goldloan, images.idfcbanner, images.personalloan, images.promoBanner]

    const header = () => {

    }
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: '#b01a20', height: 50 }}>

                <Appbar.Action icon="account" onPress={() => { }} />
                <Text style={{ color: COLORS.white }}>{name}</Text>
                <TouchableOpacity style={{ flex: 1, marginLeft: 180 }} onPress={() => navigation.navigate("Update", { accountno })}>
                    <Text style={{ color: COLORS.white }}  >edit profile</Text>
                </TouchableOpacity>

            </Appbar.Header>

            <View style={{ flex: 1, backgroundColor: '#ede1e6' }}>
                <View style={styles.bottomheader}>
                    <TouchableOpacity onPress={() => console.log("passbook")}>
                        <Image
                            source={icons.passbook}
                            resizeMode="contain"
                            style={{
                                marginLeft: 10,
                                marginTop: 15,
                                height: 30,
                                width: 30,

                            }}
                        />

                    </TouchableOpacity>
                    <Text style={{ marginTop: 45, marginLeft: -40 }}>passbook</Text>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("wishlist") }}>
                        <Image
                            source={icons.heart}
                            resizeMode="contain"
                            style={{
                                marginLeft: 13,
                                marginTop: 15,
                                height: 30,
                                width: 30,

                            }}
                        />

                    </TouchableOpacity>
                    <Text style={{ marginTop: 45, marginLeft: -40 }}>wishlist</Text>

                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("document center") }}>
                        <Image
                            source={icons.documents}
                            resizeMode="contain"
                            style={{

                                marginLeft: 32,
                                marginTop: 15,
                                height: 30,
                                width: 30,

                            }}
                        />

                    </TouchableOpacity>
                    <Text style={{ marginTop: 45, marginLeft: -50 }}>docCenter</Text>

                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("wishlist") }}>
                        <Image
                            source={icons.technicalsupport}
                            resizeMode="contain"
                            style={{
                                marginLeft: 28,
                                marginTop: 15,
                                height: 30,
                                width: 30,

                            }}
                        />

                    </TouchableOpacity>
                    <Text style={{ marginTop: 45, marginLeft: -50 }}>techSupport</Text>



                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { console.log("wishlist") }}>
                        <Image
                            source={icons.safebox}
                            resizeMode="contain"
                            style={{
                                marginLeft: 15,
                                marginTop: 15,
                                height: 30,
                                width: 30,

                            }}
                        />

                    </TouchableOpacity>
                    <Text style={{ marginTop: 45, marginLeft: -40 }}>emi vault</Text>


                </View>

                <View style={styles.myrelation}>
                    <View style={{ flex: 1, }}>

                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, }}>My relations</Text>
                        <FlatList horizontal={true} showsHorizontalScrollIndicator={false} data={myrelations} renderItem={(item) => {
                            return (<TouchableOpacity style={{ backgroundColor: '#f5e1e8', flex: 0.8, width: 100, marginLeft: 20, marginBottom: 10, marginTop: 10, borderRadius: 30 }} onPress={() => console.log("item.item.trasactiontype")}>

                                <Text style={{ fontSize: 12, marginLeft: 21, marginTop: 10, fontWeight: 'bold' }}> {item.item.relationtype} </Text>
                                <View style={{ flex: 0.01, backgroundColor: 'black', marginTop: 30 }}></View>
                                <Text style={{fontSize:12,marginLeft:5,marginTop:10}}>nextemi: {item.item.nextemi}</Text>


                            </TouchableOpacity>
                            )
                        }} />


                    </View>

                </View>

                <View style={styles.faq}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 18, marginTop: 10 }}>Here are some FAQs that might help</Text>
                    <View style={{ flex: 0.29, backgroundColor: '#ede1e6', margin: 15, borderRadius: 7, marginTop: 4, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold' }}>Where do I check the Loan Break up Details of my loan?</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flex: 0.29, backgroundColor: '#ede1e6', margin: 15, borderRadius: 7, marginTop: -5, marginBottom: 10, justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold' }}>Got stuck in-between payments?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.29, backgroundColor: '#ede1e6', margin: 15, borderRadius: 7, marginTop: -5, marginBottom: 10, justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold' }}>How may I help you?</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.preoffers}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 10 }}> Pre-approved offers for you </Text>

                    <FlatList horizontal={true} data={preoffersdata} renderItem={(item) => {
                        return <View style={[styles.scrollH, { flexDirection: 'row' }]}>

                            <View style={{ height: '100%', width: '100%', justifyContent: 'center', overflow: 'hidden' }}>
                                <Image source={item.item.model} style={{ resizeMode: 'contain', height: 200, width: 200, borderRadius: 10, alignSelf: 'center' }} />
                            </View>
                        </View>
                    }} />


                </View>

            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    bottomheader: {
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginLeft: 5,
        marginTop: 9,
        marginRight: 10,
        borderRadius: 5,
        shadowColor: 'black'
    },
    myrelation: {
        flex: 0.2,
        backgroundColor: COLORS.white,
        marginTop: 9,
        borderRadius: 5,



    },
    faq: {
        flex: 0.34,
        backgroundColor: COLORS.white,
        marginTop: 9,
        borderRadius: 20,


    },
    preoffers: {
        flex: 0.28,
        backgroundColor: COLORS.white,
        marginTop: 10,
        borderRadius: 10,
        margin: 5
    },
    scrollH: {
        height: '90%',
        elevation: 15,
        shadowColor: 'darkgrey',
        width: 170, borderRadius: 20,
        backgroundColor: '#54B435',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },




})
export default Userprofile

