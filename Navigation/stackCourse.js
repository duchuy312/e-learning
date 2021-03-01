import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainCourse from '../src/course/Main';
import DetailCourse from '../src/course/Detail';
import MiddleStartCourse from '../src/course/MiddleStart';
import RegisterCourse from '../src/course/Register';
import Course from '../src/course/Course';

const Stack = createStackNavigator();

function StackCourse() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainCourse" component={MainCourse} />
      <Stack.Screen name="DetailCourse" component={DetailCourse} />
      <Stack.Screen name="RegisterCourse" component={RegisterCourse} />
      <Stack.Screen name="MiddleStartCourse" component={MiddleStartCourse} />
      <Stack.Screen name="Course" component={Course} />
    </Stack.Navigator>
  );
}

export default StackCourse;
