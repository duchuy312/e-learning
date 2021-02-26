import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, NewsIcon} from '../../svg/icon';

export const CourseBar = (props) => {
  const navigation = useNavigation();
  const {Press1, Press2, Press3} = props;
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabBarButton} onPress={Press1}>
        <Text style={{color: '#565656'}}>Nội Dung</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.tabBarButton} onPress={Press2}>
        <Text style={{color: '#565656'}}> Tài Liệu</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <TouchableOpacity style={styles.tabBarButton} onPress={Press3}>
        <Text style={{color: '#565656'}}>Thảo Luận</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CourseBar;

const styles = StyleSheet.create({
  tabBar: {
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
  },
  tabBarButton: {
    height: scale(50),
    width: scale(116),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#144E8C',
    justifyContent: 'center',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(5),
    color: 'white',
  },
  line: {
    height: '80%',
    width: scale(1 / 2),
    backgroundColor: 'black',
  },
});
