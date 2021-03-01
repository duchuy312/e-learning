import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainExam from '../src/exam/Main';
import MainNews from '../src/news/Main';
import NewsDetail from '../src/news/NewsDetail';
import MainEvents from '../src/news/Events';
import EventsDetail from '../src/news/EventsDetail';

const Stack = createStackNavigator();

function StackEventsDetail() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainEvents" component={MainEvents} />
      <Stack.Screen name="EventsDetail" component={EventsDetail} />
    </Stack.Navigator>
  );
}

export default StackEventsDetail;
