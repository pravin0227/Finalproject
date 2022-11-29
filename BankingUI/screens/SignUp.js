import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ScrollView,
    ToastAndroid,
} from "react-native";

import axios from "axios";


export default function SignUp({ navigation }) {


    const [email, setEmail] = useState("");
    const [accountno, setaccountno] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [pincode, setpincode] = useState("");
    const [pan, setpan] = useState("");
    const [dob, setdob] = useState("");

    const [agree, setAgree] = useState(false);
    const [Chkemail, setChkemail] = useState("");
    const [Chkpassword, setChkpassword] = useState("");
    let checking = false;
    const userRef = useRef();

    const emptycheck = () => {
        if (email === "" || accountno === "" || password === "" || name === "" || phoneno === "" || city === "") {
           ToastAndroid.show("please provide all the fields",ToastAndroid.SHORT);
        } else if (password.length < 8) {
            ToastAndroid.show("please provide strong passoword It must contain 8 digits",ToastAndroid.SHORT)
        } else if (phoneno.length != 10) {
            ToastAndroid.show("please enter 10 digit valid number",ToastAndroid.SHORT);
        } else if (accountno.length != 6) {
            ToastAndroid.show("please provide 6 digit valid account number",ToastAndroid.SHORT);
        }
        else {
            saveInpayment();
            saveInupdateprofile();
            createuser();
        }
    }
    const booleans = false;
    const createuser = () => {

        axios.post('http://192.168.43.81:8082/User/createUser', {

            accountno: accountno,
            name: name,
            phoneno: phoneno,
            accountno: accountno,
            city: city,
            state: state,
            pincode: pincode,
            email: email,
            password: password,
            balance: 2000,

        })
            .then((response) => {
                
                ToastAndroid.show("User created",ToastAndroid.LONG);
                navigation.navigate("Login");

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const saveInpayment = () => {

        axios.post('http://192.168.43.81:8084/payment/save/paymentEntity', {
            accountno: accountno,
            name: name,
            phoneno: phoneno,
            accountno: accountno,
            balance: 2000,
            upiid : `${email}-1@idfc`,
            ifsc : "IDFC89030"

    

        })
            .then((response) => {
                console.log(response.data);
                console.log("user created in payment server");
                

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const saveInupdateprofile = () => {

        axios.post('http://192.168.43.81:8083/user/saveuser', {
            accountno: accountno,
            name: name,
            phoneno: phoneno,
            accountno: accountno,
            city: city,
            state: state,
            pincode: pincode,
            email: email,
            pan : pan,
            dob : dob,
            upiid : `${email}-1@idfc`


        })
            .then((response) => {
                console.log(response.data);
              console.log("user created in update profile server");               

            })
            .catch((error) => {
                console.log(error);
            })
    }


    



    return (

        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={{ backgroundColor: '#ded1d1', flex: 0.23, borderBottomEndRadius: 50, borderBottomStartRadius: 50, paddingTop: 50 }}>
                    <Image style={styles.image} source={require("../assets2/download.png")} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 45, margin: 10, paddingBottom: 20 }}>Signup || User</Text>
                    </View>
                    <View >


                        <View style={{ backgroundColor: '#fff', alignItems: 'center', top: 10, paddingTop: 30 }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your name"
                                    placeholderTextColor="grey"

                                    require
                                    value={name}
                                    onChangeText={(name) => setName(name)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Account number"
                                    placeholderTextColor="grey"
                                    keyboardType="number-pad"
                                    require
                                    value={accountno}
                                    onChangeText={(accountno) => setaccountno(accountno)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter email address"
                                    placeholderTextColor="grey"
                                    keyboardType="email-address"
                                    require
                                    value={email}
                                    onChangeText={(email) => setEmail(email)}
                                />

                            </View>

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your password"
                                    placeholderTextColor="grey"

                                    require
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Phone number"
                                    placeholderTextColor="grey"
                                    keyboardType="number-pad"
                                    require
                                    value={phoneno}
                                    onChangeText={(phoneno) => setphoneno(phoneno)}
                                />


                            </View>
                            
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your Pan number"
                                    placeholderTextColor="grey"

                                    require
                                    value={pan}
                                    onChangeText={(pan) => setpan(pan)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Date of birth(dd-mm-yyy)"
                                    placeholderTextColor="grey"

                                    require
                                    value={dob}
                                    onChangeText={(dob) => setdob(dob)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your city"
                                    placeholderTextColor="grey"

                                    require
                                    value={city}
                                    onChangeText={(city) => setcity(city)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your state"
                                    placeholderTextColor="grey"

                                    require
                                    value={state}
                                    onChangeText={(state) => setstate(state)}
                                />


                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter your pincode"
                                    placeholderTextColor="grey"

                                    require
                                    value={pincode}
                                    onChangeText={(pincode) => setpincode(pincode)}
                                />


                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={emptycheck} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, margin: 2 }}>Signup</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                                <Text style={{ color: 'black', fontSize: 15, margin: 2 }}>Login</Text>
                            </TouchableOpacity>


                            <Image style={styles.image1} source={require("../assets2/paymentlogo1.png")} />



                        </View>
                    </View>




                </View>
            </ScrollView>

        </View>

    )


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#de6262",
        alignItems: "center",
        justifyContent: "center",
    },
    container1: {
        flex: 1,
        backgroundColor: "#de6262",

        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
        resizeMode: 'cover',
        height: 70,
        width: 200,

        marginBottom: 10

    },
    image1: {
        marginTop: 20,
        resizeMode: 'cover',
        height: 240,
        width: 400,

        marginBottom: 10

    },

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,

        borderWidth: 2,
        width: 250,
        borderRadius: 30
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#9b1c29",
        marginBottom: 20
    },
    checkboxcontainer: {
        marginBottom: 100,
        color: 'red',
    },
});