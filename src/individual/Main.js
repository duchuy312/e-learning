import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';

const MainIndividual = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Individual</Text>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {flex: 1},
});
