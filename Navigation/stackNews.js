import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MainNews from '../src/news/Main';

const Stack = createStackNavigator();

function StackNews() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainNews" component={MainNews} />
    </Stack.Navigator>
  );
}

export default StackNews;
