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

const MainExam = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Exam</Text>
    </View>
  );
};

export default MainExam;

const styles = StyleSheet.create({
  container: {flex: 1},
});
