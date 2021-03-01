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

const Course = ({navigation}) => {
  const [checked, setCheck] = useState(false);
  const DATA = [
    {
      id: '1',
      title: 'Chương 1: Tổng quan khóa học',
      lesson: [
        {lessonName: 'Bài 1: Giới thiệu, làm quen với phần mềm'},
        {lessonName: 'Bài 2: Quy trình sử lý nghiệp vụ'},
        {lessonName: 'Bài 3: Kĩ thuật nâng cao'},
        {lessonName: 'Bài 4: Thực hành '},
        {lessonName: 'Bài 5: Tổng kết chương'},
      ],
    },
    {
      id: '2',
      title: 'Chương 2',
      lesson: [
        {lessonName: 'Bài 1: Giới thiệu, làm quen với phần mềm'},
        {lessonName: 'Bài 2: Quy trình sử lý nghiệp vụ'},
        {lessonName: 'Bài 3: Kĩ thuật nâng cao'},
        {lessonName: 'Bài 4: Thực hành '},
        {lessonName: 'Bài 5: Tổng kết chương'},
      ],
    },
    {
      id: '3',
      title: 'Chương 3',
      lesson: [
        {lessonName: 'Bài 1: Giới thiệu, làm quen với phần mềm'},
        {lessonName: 'Bài 2: Quy trình sử lý nghiệp vụ'},
        {lessonName: 'Bài 3: Kĩ thuật nâng cao'},
        {lessonName: 'Bài 4: Thực hành '},
        {lessonName: 'Bài 5: Tổng kết chương'},
      ],
    },
    {
      id: '4',
      title: 'Chương 4',
      lesson: [
        {lessonName: 'Bài 1: Giới thiệu, làm quen với phần mềm'},
        {lessonName: 'Bài 2: Quy trình sử lý nghiệp vụ'},
        {lessonName: 'Bài 3: Kĩ thuật nâng cao'},
        {lessonName: 'Bài 4: Thực hành '},
        {lessonName: 'Bài 5: Tổng kết chương'},
      ],
    },
  ];

  const renderItem = ({item}) => {
    let Lesson = item.lesson;

    return (
      <View style={styles.items}>
        <TouchableOpacity style={styles.titleChapter}>
          <Text style={styles.txtTitle}>{item.title}</Text>
        </TouchableOpacity>
        {Lesson.map((i) => (
          <View>
            <TouchableOpacity style={styles.titleLesson}>
              <Text style={styles.txtLesson}>{i.lessonName}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.line} />
      </View>
    );
  };

  const doST = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        header={styles.header}
        styleButtonLeft={styles.btnback}
        doST={doST}
        title="Khóa học phát triển kĩ năng"
        styleTitle={styles.titleHeader}
        styleImgLeft={styles.imgBack}
        sourceImgLeft={require('../../img/Back.png')}
      />
      <View style={styles.body}>
        <View style={styles.imgBlack} />
        <FlatList
          style={styles.FlatList}
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.btnExamination}>
          <Text>{'Thi cuối khóa'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Course;

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
