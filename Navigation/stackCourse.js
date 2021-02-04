import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainCourse from '../src/course/Main';

const Stack = createStackNavigator();

function StackCourse() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainCourse" component={MainCourse} />
    </Stack.Navigator>
  );
}

export default StackCourse;
