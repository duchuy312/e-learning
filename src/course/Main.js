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
import {Header} from '../components/header';

const MainCourse = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const doST = () => {
    setModalVisible(true);
  };
  return (
    <View>
      <Text>course</Text>
    </View>
  );
};

export default MainCourse;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flex: 1,
    backgroundColor: '#144E8C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnback: {
    width: scale(15),
    height: scale(15),
    position: 'absolute',
    left: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {width: scale(15), height: scale(15)},
  titleHeader: {color: '#fff', fontSize: scale(18)},
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgBlack: {width: '100%', height: scale(200), backgroundColor: '#000'},
  items: {padding: scale(10), justifyContent: 'center'},
  btnExamination: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    margin: scale(10),
  },
  titleChapter: {
    marginLeft: scale(10),
    justifyContent: 'center',
    width: scale(200),
    height: scale(40),
  },
  txtTitle: {
    color: '#000',
  },
  titleLesson: {
    justifyContent: 'center',
    marginLeft: scale(20),
    width: scale(300),
    height: scale(40),
  },
  txtLesson: {color: '#000'},
  line: {width: '100%', height: scale(1), backgroundColor: '#aaa'},
  FlatList: {
    padding: scale(10),
    width: '100%',
  },
  txtLessonC: {color: '#144E8C'},
});
