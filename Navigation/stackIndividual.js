import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//thay man cua minh o day
import MainIndividual from '../src/individual/Main';
import UserInfor from '../src/individual/UserInfor';
import ResetPass from '../src/individual/ResetPass';
import HistoryScreen from '../src/individual/History';
import ExamHistory from '../src/individual/ExamHistory';
import EditProfile from '../src/individual/EditProfile';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function StackIndividual() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainIndividual" component={MainIndividual} />
      <Stack.Screen name="UserInfor" component={UserInfor} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="ExamHistory" component={ExamHistory} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>

    // <Tab.Navigator
    //   tabBarOptions={{
    //     inactiveTintColor: '#9D9D9D',
    //     activeTintColor: 'orange',
    //     labelStyle: {fontSize: 20},
    //     style: {height: 60},
    //   }}>
    //   <Tab.Screen name="UserInfor" component={UserInfor} />
    //   <Tab.Screen name="ResetPass" component={ResetPass} />
    // </Tab.Navigator>
  );
}

export default StackIndividual;
