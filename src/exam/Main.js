import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import { scale } from 'react-native-size-matters';
import styles from './Style';
import Test from './Test';
import ViewBar from './ViewBar';

const MainExam = ( { navigation }) => {

// const {setLesson} = props;
  const onPress = ({ item }) =>
  <Test
    setLesson={item}
    />
  const lesson = [
    {
      id: '1',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',

    },
    {
      id: '2',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '3',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '4',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '5',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '6',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '7',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    },
    {
      id: '8',
      name: 'Bài thi đánh giá năng lực số 1',
      time: '28/12/2019 - 30/12/2020',
    }
  ];
  return (
    <View style={styles.container}>
      <View style={styles.viewBar}>
        <ViewBar />
      </View>
      <View style={styles.body}>
        <FlatList
           data={lesson}
           renderItem={onPress}
          keyExtractor={(item) => item.id}
          numColumns={2}

        />
      </View>
    </View>
  );
}

export default MainExam;

