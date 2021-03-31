import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';
import CourseDetail from '../src/course/CourseDetail';
import Documents from '../src/course/Document';
import Discussion from '../src/course/Discussion';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ContentIcon, DocumentIcon, ChatIcon} from '../svg/icon';

const Tab = createMaterialTopTabNavigator();
function TopCourse() {
  const routedata = useRoute();
  const {CourseID, CourseTK, CourseImage} = routedata.params;
  function LogoTitle(props) {
    const {name, icon, textcolor, select} = props;
    return (
      <View style={styles.top}>
        {select ? (
          <Text
            style={{
              fontSize: scale(15),
              color: textcolor,
              marginRight: scale(10),
            }}>
            {name}
          </Text>
        ) : (
          <View>{icon}</View>
        )}
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          let iconName;
          if (route.name === 'CourseDetail') {
            iconName = focused ? (
              <LogoTitle select={true} textcolor="#FCB71E" name="Nội dung" />
            ) : (
              <LogoTitle
                select={false}
                icon={<ContentIcon color="#9D9D9D" />}
              />
            );
          } else if (route.name === 'Documents') {
            iconName = focused ? (
              <LogoTitle select={true} textcolor="#FCB71E" name="Tài liệu" />
            ) : (
              <LogoTitle
                select={false}
                icon={<DocumentIcon color="#9D9D9D" />}
              />
            );
          } else if (route.name === 'Discussion') {
            iconName = focused ? (
              <LogoTitle select={true} textcolor="#FCB71E" name="Thảo luận" />
            ) : (
              <LogoTitle select={false} icon={<ChatIcon color="#9D9D9D" />} />
            );
          }
          return <View>{iconName}</View>;
        },
        // tabBarVisible: false,
      })}
      tabBarOptions={{
        inactiveTintColor: '#9D9D9D',
        activeTintColor: '#144E8C',
        labelStyle: {fontSize: scale(12)},
        style: {
          height: scale(50),
          backgroundColor: '#ffffff',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="CourseDetail"
        component={CourseDetail}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
      <Tab.Screen
        name="Documents"
        component={Documents}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
      <Tab.Screen
        name="Discussion"
        component={Discussion}
        initialParams={{
          CourseID: CourseID,
          CourseTK: CourseTK,
          CourseImage: CourseImage,
        }}
      />
    </Tab.Navigator>
  );
}

export default TopCourse;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(16),
    color: 'white',
    marginRight: scale(10),
  },
  top: {
    width: scale(100),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
