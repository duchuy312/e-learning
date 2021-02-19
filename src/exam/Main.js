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
import ViewBar from './ViewBar';

const MainExam = ({navigation}) => {
  const lesson = [
    {
      id: '1',
      name: 'Bài thi đánh giá năng lực số 1',


    },
    {
      id: '2',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '3',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '4',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '5',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '6',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '7',
      name: 'Bài thi đánh giá năng lực số 1',

    },
    {
      id: '8',
      name: 'Bài thi đánh giá năng lực số 1',

    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.viewBar}>
        <ViewBar />
      </View>
      <View style={styles.body}>
        <Text>
          
        </Text>
        <FlatList 
        
        
        />
      </View>
    </View>
  );
};

export default MainExam;

