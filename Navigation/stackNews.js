import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MainNews from '../src/news/Main';
import MainEvents from '../src/news/Events';
import StackNewsDetail from '../Navigation/stackNewsDetail';
import StackEventsDetail from './stackEventsDetail';

const Tab = createMaterialTopTabNavigator();

function StackNews() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: '#9D9D9D',
        activeTintColor: 'orange',
        labelStyle: {fontSize: 18},
        style: {height: 50},
      }}>
      <Tab.Screen name="News" component={StackNewsDetail} />
      <Tab.Screen name="Events" component={StackEventsDetail} />
    </Tab.Navigator>
  );
}

export default StackNews;
