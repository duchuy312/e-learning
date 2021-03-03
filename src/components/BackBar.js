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

export const Backbar = (props) => {
  const navigation = useNavigation();
  const {title} = props;
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconPosition}>
        <BackIcon color={'#fff'} />
      </TouchableOpacity>
      <Text style={styles.topTittle}>{title}</Text>
    </View>
  );
};
export default Backbar;

const styles = StyleSheet.create({
  searchBar: {
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#144E8C',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
    flexDirection: 'row',
    position: 'absolute',
    left: scale(5),
  },
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(5),
    color: 'white',
    width: scale(300),
    position: 'absolute',
    right: scale(0),
  },
});
