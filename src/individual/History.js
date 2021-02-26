/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Backbar from './backBar';

const LessonList = [
  {
    id: '1',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
  {
    id: '2',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
  {
    id: '3',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
  {
    id: '4',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
  {
    id: '5',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
  {
    id: '6',
    name: 'Bài thi số 1',
    image: require('../../img/image11.png'),
    result: '90/100',
    rating: 'Đạt',
    time: '27/9/2020',
  },
];
const History = ({navigation, item}) => {
  return (
    <View style={styles.container}>
      <Backbar title={'       Lịch sử thi'} />
      <TouchableOpacity onPress={() => navigation.navigate('ExamHistory')}>
        <View style={styles.view}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../img/image11.png')}
              style={styles.stretch}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bài thi số 1</Text>
            <View style={{marginTop: 5}}>
              <Text>Kết quả: 90/100</Text>
              <Text>Xếp loại: Đạt</Text>
              <Text>27/9/2020</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.image}
              source={require('../../img/greater.png')}></Image>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {flex: 1},
  view: {
    borderRadius: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginTop: 10,
  },
  stretch: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 30,
    width: 100,
    height: 100,
    marginLeft: 10,
    resizeMode: 'stretch',
  },
  image: {
    marginTop: '40%',
    marginRight: 30,
    height: 30,
    width: 20,
  },
});
