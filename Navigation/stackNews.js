import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MainNews from '../src/news/Main';
import MainEvents from '../src/news/Events';
import StackNewsDetail from '../Navigation/stackNewsDetail';
import StackEventsDetail from './stackEventsDetail';
import {scale} from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

function StackNews() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: '#9D9D9D',
        activeTintColor: 'white',
        labelStyle: {fontSize: scale(18)},
        style: {height: scale(56), backgroundColor: '#144E8C'},
      }}>
      <Tab.Screen name="News" component={StackNewsDetail} />
      <Tab.Screen name="Events" component={StackEventsDetail} />
    </Tab.Navigator>
  );
}

export default StackNews;
