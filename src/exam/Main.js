import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Header } from '../components/header';
import BarView from './BarView';
import styles from './Styles';
import Test from './Test';

const MainExam = ({ navigation }) => {
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
      <View style={styles.slider}>
        <BarView />
        {/* <Header /> */}
      </View>
      <View style={styles.body}>

        <FlatList
          data={lesson}
          renderItem={({ item }) =>
            <Test
              setLesson={item}
              />}
          keyExtractor={item => item.id}
          numColumns={2}
        // contentContainerStyle = {{paddingLeft: 10, paddingRight: 10}}
        >

        </FlatList>
      </View>
    </View>

  );
};

export default MainExam;

// const styles = StyleSheet.create({
//   container: {flex: 1},
// });
