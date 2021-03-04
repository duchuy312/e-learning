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

export const TitleBar = (props) => {
  const navigation = useNavigation();
  const {title1} = props;
  return (
    <View style={styles.searchBar}>
      <Text style={styles.topTittle}>{title1}</Text>
    </View>
  );
};
export default TitleBar;

const styles = StyleSheet.create({
  searchBar: {
    height: scale(56),
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
});
