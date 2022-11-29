import React from 'react';

import { Home, Scan, SignUp } from "./screens";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Tabs from "./navigation/Tabs";
import Login from './screens/Login';
import Maintenance from './screens/Maintenance'
import Paynumber from './screens/Paynumber';
import Payphone from './screens/Payphone';
import Payupi from './screens/Payupi';
import Banktransfer from './screens/Banktransfer';
import Paybill from './screens/Paybill';
import Update from './screens/Update';
import UpdateProfile from './screens/UpdateProfile';
import UpdateProfileDOB from './screens/UpdateProfileDOB';
import UpdateProfilenumber from './screens/UpdateProfilenumber';
import UpdateProfileemail from './screens/UpdateProfileemail';
import UpdateProfileAddress from './screens/UpdateProfileAddress';
import Payamount from './screens/Payamount';
import Payamountbank from './screens/Payamountbank';
import Payamountupi from './screens/Payamountupi';
import Historytransactions from './screens/Historytransactions';
import Resetpass from './screens/Resetpass';





const Stack = createNativeStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
    })
    
    if(!loaded){
    return null;
    }
    return (
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                
                <Stack.Screen name="Login" component={Login} />

                {/* Tabs */}
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Maintenance" component={Maintenance} />
                <Stack.Screen name="Scan" component={Scan} />
                <Stack.Screen name="Payphone" component={Payphone} />
                <Stack.Screen name="Payupi" component={Payupi} />
                <Stack.Screen name="Banktransfer" component={Banktransfer} />
                <Stack.Screen name="Paybill" component={Paybill} />
                <Stack.Screen name="Update" component={Update} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                <Stack.Screen name="UpdateProfileDOB" component={UpdateProfileDOB} />
                <Stack.Screen name="UpdateProfilenumber" component={UpdateProfilenumber} />
                <Stack.Screen name="UpdateProfileemail" component={UpdateProfileemail} />
                <Stack.Screen name="UpdateProfileAddress" component={UpdateProfileAddress} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Payamount" component={Payamount} />
                <Stack.Screen name="Payamountbank" component={Payamountbank} />
                <Stack.Screen name="Payamountupi" component={Payamountupi} />
                <Stack.Screen name="Historytransactions" component={Historytransactions} />
                <Stack.Screen name="Resetpass" component={Resetpass} />
                
                
                
                
                
                
           
                
                
                
                
                
                
                
                
                
                
                
                
                
                <Stack.Screen name="Paynumber" component={Paynumber} />
                

               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;