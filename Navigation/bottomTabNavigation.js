import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackCourse from './stackCourse';
import StackExam from './stackExam';
import StackNews from './stackNews';
import StackIndividual from './stackIndividual';
import {CourseIcon, UserIcon, TestIcon, NewsIcon} from '../svg/icon';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Khóa học') {
            iconName = focused ? (
              <CourseIcon color="orange" />
            ) : (
              <CourseIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Kỳ thi') {
            iconName = focused ? (
              <TestIcon color="orange" />
            ) : (
              <TestIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Tin tức') {
            iconName = focused ? (
              <NewsIcon color="orange" />
            ) : (
              <NewsIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? (
              <UserIcon color="orange" />
            ) : (
              <UserIcon color="#C7C7C7" />
            );
          }
          return <View>{iconName}</View>;
        },
        // tabBarVisible: false,
      })}
      tabBarOptions={{
        labelStyle: {fontSize: 15},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          height: 65,
        },
      }}>
      <Tab.Screen name="Khóa học" component={StackCourse} />
      <Tab.Screen name="Kỳ thi" component={StackExam} />
      <Tab.Screen name="Tin tức" component={StackNews} />
      <Tab.Screen name="Cá nhân" component={StackIndividual} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigations;
