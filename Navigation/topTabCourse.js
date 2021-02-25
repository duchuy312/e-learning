import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../src/components/header';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import DetailCourse from '../src/course/Detail';
import Documents from '../src/course/Documents';
import Chat from '../src/course/Chat';

const Tab = createMaterialTopTabNavigator();

export default function TopTabCourse({route}) {
  const {courseID, token} = route.params;
  return (
    <Tab.Navigator
      options={{
        title: 'Chi tiết khóa học',
        labelStyle: {fontSize: scale(20)},
        tabBarColor: '#FF6347',
        tabBarIcon: {color: '#fff'},
      }}>
      <Tab.Screen
        name="Nội dung"
        component={DetailCourse}
        initialParams={{courseID: courseID, token: token}}
      />
      <Tab.Screen
        name="Tài liệu"
        component={Documents}
        initialParams={{courseID: courseID, token: token}}
      />
      <Tab.Screen
        name="Thảo luận"
        component={Chat}
        initialParams={{courseID: courseID, token: token}}
      />
    </Tab.Navigator>
  );
}
