import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainIndividual from '../src/individual/Main';
import UserInfor from '../src/individual/UserInfor';
import ChangePass from '../src/individual/ChangePass';

const Stack = createStackNavigator();

function StackIndividual() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainIndividual" component={MainIndividual} />
      <Stack.Screen name="UserInfor" component={UserInfor} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
    </Stack.Navigator>
  );
}

export default StackIndividual;
