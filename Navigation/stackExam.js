import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainExam from '../src/exam/Main';
import DetailExam from '../src/exam/Detail';

const Stack = createStackNavigator();

function StackExam() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainExam" component={MainExam} />
      <Stack.Screen name="DetailExam" component={DetailExam} />
    </Stack.Navigator>
  );
}

export default StackExam;
