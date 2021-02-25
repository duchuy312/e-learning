import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainCourse from '../src/course/Main';
import TopTabCourse from './topTabCourse';
import MiddleStartCourse from '../src/course/MiddleStart';
import Course from '../src/course/Course';
import RegisterCourse from '../src/course/Register';

const Stack = createStackNavigator();

function StackCourse() {
  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: '#144E8C'}}}>
      <Stack.Screen
        name="MainCourse"
        component={MainCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Chi tiết khóa học" component={TopTabCourse} />
      <Stack.Screen
        name="RegisterCourse"
        component={RegisterCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MiddleStartCourse"
        component={MiddleStartCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StackCourse;
