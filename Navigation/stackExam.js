import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainExam from '../src/exam/Main';
import DetailExam from '../src/exam/Detail';
import Exam from '../src/exam/Exam';

const Stack = createStackNavigator();

function StackExam() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainExam" component={MainExam} />
      <Stack.Screen name="DetailExam" component={DetailExam} />
      <Stack.Screen name="Exam" component={Exam} />
    </Stack.Navigator>
  );
}

export default StackExam;
