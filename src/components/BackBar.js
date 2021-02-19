import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { BackIcon, NewsIcon } from '../../svg/icon';

export const Backbar = (props) => {
  const navigation = useNavigation();
  const { title, title1 } = props;
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconPosition}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles.topTittle}>{title}</Text>
      <Text style={styles.topTittle1}>{title1}</Text>
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
    backgroundColor: '#144E8C'
  },
  iconPosition: {
    marginLeft: scale(15),
    marginRight: scale(8),
    justifyContent: 'center'
  },
  topTittle: {
    fontSize: scale(17),
    marginLeft: scale(10),
    color: 'white',
    alignSelf: 'center'
  },
});
