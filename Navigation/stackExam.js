import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//thay man cua minh o day
import MainExam from '../src/exam/Main';
import ExamDetail from '../src/exam/ExamDetail';
import ExamResult from '../src/exam/ExamResult';
import DoingExam from '../src/exam/DoingExam';
const Stack = createStackNavigator();

function StackExam({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DoingExam') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainExam" component={MainExam} />
      <Stack.Screen name="ExamDetail" component={ExamDetail} />
      <Stack.Screen name="ExamResult" component={ExamResult} />
      <Stack.Screen name="DoingExam" component={DoingExam} />
    </Stack.Navigator>
  );
}

export default StackExam;
