import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

export const Backbar = (props) => {
  const navigation = useNavigation();
  const {title, title1} = props;
  return (
    <View style={styles.backBar}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconPosition}></TouchableOpacity>
      <Text style={styles.topTittle1}>{title1}</Text>
      <Text style={styles.topTittle}>{title}</Text>
    </View>
  );
};
export default Backbar;
const styles = StyleSheet.create({
  container: {flex: 1},
  backBar: {
    height: 50,
    width: '100%',
    backgroundColor: '#3b7ad0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
  },
  topTittle: {
    fontSize: scale(18),
    marginLeft: scale(40),
    color: 'white',
  },
  topTittle1: {
    fontSize: scale(18),
    marginLeft: scale(40),
    color: 'white',
  },
});
