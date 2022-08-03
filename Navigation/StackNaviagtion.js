import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react';

import LoginScreen from '../Screens/LoginScreen'
import OTPScreen from '../Screens/OTPScreen'
import BottomNavigation from './BottomNavigation'
import Signup from '../Screens/Signup'
import SplashScreen from '../Screens/Splashscreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function StackNavigation() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1500);
  }, []);

// const StackNavigation = () => {
  return (
    <Stack.Navigator>
       {showSplashScreen ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : null}
   <Stack.Screen name="LoginScreen" component={LoginScreen}
   options={{
     headerShown:false,
   }} />
   
      <Stack.Screen name='BottomNavigation' component={BottomNavigation}
        options={{
          headerShown:false,
        }}
      />
            <Stack.Screen name="OTPScreen" component={OTPScreen} 
            options={{
              headerShown:false,
            }}/>
             <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name='HomeScreen' component={HomeScreen}/> */}
    </Stack.Navigator>
  )
}

