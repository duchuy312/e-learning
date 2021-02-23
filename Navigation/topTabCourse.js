import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from '../src/components/header';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

import DetailCourse from '../src/course/Detail';
import Documents from '../src/course/Documents';
import Menu from '../src/course/Menu';

const Tab = createMaterialTopTabNavigator();

// function TabBar({navigation}) {
//   const doST = () => {
//     navigation.navigate('MainCourse');
//   };
//   return (
//     <View>
//       <Header
//         header={styles.header}
//         styleButtonLeft={styles.btnback}
//         styleImgLeft={styles.imgBack}
//         doST={doST}
//         title="Chi tiết khóa học"
//         styleTitle={styles.titleHeader}
//         sourceImgLeft={require('../img/Back.png')}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flex: 1,
//     backgroundColor: '#144E8C',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnback: {
//     width: scale(15),
//     height: scale(15),
//     position: 'absolute',
//     left: scale(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imgBack: {width: scale(15), height: scale(15)},
//   titleHeader: {color: '#fff', fontSize: scale(18)},
// });

export default function TopTabCourse() {
  //tabBar={() => TabBar()
  return (
    <Tab.Navigator>
      <Tab.Screen name="Nội dung" component={DetailCourse} />
      <Tab.Screen name="Đề cương" component={Menu} />
      <Tab.Screen name="Tài liệu" component={Documents} />
    </Tab.Navigator>
  );
}
