import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MainNews from '../src/news/Main';
import MainEvents from '../src/news/Events';

const Tab = createMaterialTopTabNavigator();

function StackNews() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: '#9D9D9D',
        activeTintColor: 'orange',
        labelStyle: {fontSize: 20},
        style: {height: 60},
      }}>
      <Tab.Screen name="News" component={MainNews} />
      <Tab.Screen name="Events" component={MainEvents} />
    </Tab.Navigator>
  );
}

export default StackNews;
