import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainExam from '../src/exam/Main';
import ExamDetail from '../src/exam/ExamDetail';
import ExamResult from '../src/exam/ExamResult';

const Stack = createStackNavigator();

function StackExam() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainExam" component={MainExam} />
      <Stack.Screen name="ExamDetail" component={ExamDetail} />
      <Stack.Screen name="ExamResult" component={ExamResult} />
    </Stack.Navigator>
  );
}

export default StackExam;
