import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import BeginNavigation from './beginToLogin';
import StackCourse from './stackCourse';
import StackNews from './stackNews';
import StackIndividual from './stackIndividual';
import StackExam from './stackExam';
import BottomTabNavigations from './bottomTabNavigation';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BeginNavigation" component={BeginNavigation} />
        <Stack.Screen
          name="BottomTabNavigations"
          component={BottomTabNavigations}
        />
        <Stack.Screen name="StackCourse" component={StackCourse} />
        <Stack.Screen name="StackNews" component={StackNews} />
        <Stack.Screen name="StackIndividual" component={StackIndividual} />
        <Stack.Screen name="StackExam" component={StackExam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
