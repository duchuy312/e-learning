import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainCourse from '../src/course/Main';

import TopTabCourse from './topTabCourse';
import Course from '../src/course/Course';
import RegisterCourse from '../src/course/Register';
import WebViewComponent from '../src/course/WebViewComponent';
import RenderSound from '../src/course/RenderSound';
import ReadPDF from '../src/course/ReadPDF';

const Stack = createStackNavigator();

function StackCourse() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#144E8C'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
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
        name="WebViewComponent"
        component={WebViewComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RenderSound"
        component={RenderSound}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReadPDF"
        component={ReadPDF}
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
