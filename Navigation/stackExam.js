import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainExam from '../src/exam/Main';

import TestDetail from '../src/exam/TestDetail';
import TestChoice from '../src/exam/TestChoice';
import TestListRound from '../src/exam/TestListRound';
const Stack = createStackNavigator();

function StackExam() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainExam" component={MainExam} />
      <Stack.Screen name="TestDetail" component={TestDetail} />
      <Stack.Screen name="TestChoice" component={TestChoice} />
      <Stack.Screen name="TestListRound" component={TestListRound} />
    </Stack.Navigator>
  );
}

export default StackExam;
