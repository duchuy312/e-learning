import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';
import CourseDetail from '../src/course/CourseDetail';
import Documents from '../src/course/Document';
import Discussion from '../src/course/Discussion';
import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
function TopCourse() {
  const route = useRoute();
  const {CourseID, CourseTK, CourseImage} = route.params;
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: '#9D9D9D',
        activeTintColor: '#144E8C',
        labelStyle: {fontSize: scale(12)},
        style: {
          height: scale(50),
          backgroundColor: '#EAEAEA',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Nội Dung"
        component={CourseDetail}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
      <Tab.Screen
        name="Tài Liệu"
        component={Documents}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
      <Tab.Screen
        name="Thảo Luận"
        component={Discussion}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
    </Tab.Navigator>
  );
}

export default TopCourse;
