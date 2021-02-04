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

const MainNews = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
};

export default MainNews;

const styles = StyleSheet.create({
  container: {flex: 1},
});
