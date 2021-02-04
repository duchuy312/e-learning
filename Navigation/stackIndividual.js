import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainIndividual from '../src/individual/Main';

const Stack = createStackNavigator();

function StackIndividual() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainIndividual" component={MainIndividual} />
    </Stack.Navigator>
  );
}

export default StackIndividual;
