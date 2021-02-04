import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BeginScreen from '../src/beginScreen';
import LoginScreen from '../src/loginScreen';
import RegisterScreen from '../src/registerScreen';
import ForgotPassScreen from '../src/forgotPassScreen';
const Stack = createStackNavigator();

function BeginNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BeginScreen" component={BeginScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BeginNavigation;
