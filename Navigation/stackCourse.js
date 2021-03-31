import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import MainCourse from '../src/course/Main';
import {scale} from 'react-native-size-matters';
import TopCourse from './topCourse';
import {BackIcon} from '../svg/icon';
import WareCourse from '../src/course/Learning';
import VideoPlayer from '../src/course/PlayVideoScreen';
import DoingExam from '../src/course/DoingExam';
import ChatRoom from '../src/course/ChatRoom';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();

function StackCourse({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DoingExam' || routeName === 'ChatRoom') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  function LogoTitle(props) {
    const {text} = props;
    return (
      <View>
        <Text style={styles.topTittle}>{text}</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#144E8C',
          height: scale(50),
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="MainCourse"
        component={MainCourse}
      />
      <Stack.Screen
        name="TopCourse"
        component={TopCourse}
        options={{
          headerTitle: (props) => <LogoTitle text="Chi tiết khóa học" />,
          headerBackImage: () => <BackIcon color={'white'} />,
        }}
      />
      <Stack.Screen
        name="WareCourse"
        component={WareCourse}
        options={{
          headerTitle: (props) => <LogoTitle text="Chi tiết khóa học" />,
          headerBackImage: () => <BackIcon color={'white'} />,
        }}
      />
      <Stack.Screen
        name="DoingExam"
        component={DoingExam}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{
          headerTitle: (props) => <LogoTitle text="Chi tiết khóa học" />,
          headerBackImage: () => <BackIcon color={'white'} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackCourse;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'white',
  },
});
