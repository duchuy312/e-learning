import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import StackCourse from './stackCourse';
import StackExam from './stackExam';
import StackNews from './stackNews';
import StackIndividual from './stackIndividual';

const Tab = createBottomTabNavigator();

const BottomTabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Khóa học') {
            iconName = focused ? 'bulb-outline' : 'bulb-outline';
          } else if (route.name === 'Kỳ thi') {
            iconName = focused
              ? 'document-text-outline'
              : 'document-text-outline';
          } else if (route.name === 'Tin tức') {
            iconName = focused ? 'newspaper-outline' : 'newspaper-outline';
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Khóa học" component={StackCourse} />
      <Tab.Screen name="Kỳ thi" component={StackExam} />
      <Tab.Screen name="Tin tức" component={StackNews} />
      <Tab.Screen name="Cá nhân" component={StackIndividual} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigations;
