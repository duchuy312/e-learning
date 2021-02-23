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
    <Stack.Navigator>
      <Stack.Screen
        name="MainCourse"
        component={MainCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TopTabCourse" component={TopTabCourse} />
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
