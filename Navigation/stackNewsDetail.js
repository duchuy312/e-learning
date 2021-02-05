import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainExam from '../src/exam/Main';
import MainNews from '../src/news/Main';
import NewsDetail from '../src/news/NewsDetail';

const Stack = createStackNavigator();

function StackNewsDetail() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainNews" component={MainNews} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
    </Stack.Navigator>
  );
}

export default StackNewsDetail;
