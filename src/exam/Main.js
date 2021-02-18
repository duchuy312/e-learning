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
import styles from './Style';

const MainExam = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewBar}>

      </View>
      <View style={styles.body}>
        <FlatList 
        
        
        />
      </View>
    </View>
  );
};

export default MainExam;

