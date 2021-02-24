import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BeginScreen from '../src/beginScreen';
import LoginScreen from '../src/loginScreen';
import RegisterScreen from '../src/registerScreen';
import ForgotPassScreen from '../src/forgotPassScreen';
import BottomTabNavigations from './bottomTabNavigation';
import StackIndividual from './stackIndividual';
const Stack = createStackNavigator();

function BeginNavigation() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="BeginScreen" component={BeginScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      <Stack.Screen
        name="BottomTabNavigations"
        component={BottomTabNavigations}
      />
      <Stack.Screen name="StackIndividual" component={StackIndividual} />
    </Stack.Navigator>
  );
}

export default BeginNavigation;
