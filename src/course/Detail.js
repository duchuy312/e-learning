/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';

import { scale } from 'react-native-size-matters';
import axios from 'axios';

import StarRating from '../components/Star';

function DetailCourse({ route, navigation }) {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [appear, setAppear] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(false);
  const [count, setCount] = useState(0);

  const { courseID, token } = route.params;

  const getDetail = () => {
    axios.get(`http://elearning-uat.tmgs.vn/api/course/${courseID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setCourseName(res.data.data.name);
        setRating(data.rates[0].valuess);
        setAppear(true);
        setCount(count + 1);
      });
  };

  function checkCourseIsPublicOrNot() {
    axios
      .get(
        `http://elearning-uat.tmgs.vn/api/course/courseJoin/${courseID}/currentUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        // console.log(res);
        //if course is public
        if (res.data.message === 'true') {
          setModalVisible(true);
        } else {
          navigation.navigate('RegisterCourse', {
            courseID: courseID,
            token: token,
          });
        }
      });
  }

  function postRequestJoinCourse() {
    axios.post('http://elearning-uat.tmgs.vn/api/course/join',
      {
        body: { id: 3 },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        navigation.navigate('Course', { courseID: courseID, token: token, courseName: courseName });
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, data]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../img/image11.png')}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>
        <Text>{`Create by: ${data.createdBy}`}</Text>
        {
          (appear === true) && <StarRating ratings={rating} />
        }
        <View style={styles.overBtn}>
          <TouchableOpacity
            style={styles.buttonDK}
            onPress={() => {
              checkCourseIsPublicOrNot();
            }}>
            <Text style={styles.txtBtnDK}>{'Đăng kí học'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={styles.modalView}
            onPress={() => {
              setModalVisible(false);
              postRequestJoinCourse();
            }}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>{'Khoá học public'}</Text>
              <Text>{'Nhấn để tham gia khóa học'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default DetailCourse;

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#fff' },
  /**---------------Body------------------ */
  btnLine: { flexDirection: 'row', justifyContent: 'space-around' },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtButton: { color: '#144e8c', fontSize: 14 },
  img: { width: '100%', height: 200, marginTop: 10, borderRadius: 20 },
  content: { marginHorizontal: 20 },
  title: { fontWeight: 'bold', fontSize: scale(20) },
  starIcon: { width: 15, height: 15 },
  blurText: { color: '#aaa', marginRight: 50 },

  link: {
    textDecorationLine: 'underline',
    color: '#144e8c',
    width: 500,
  },

  overBtn: { alignItems: 'center' },

  buttonDK: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  txtBtnDK: { color: '#fff' },
  text: { marginTop: 20 },
  normalText: { fontSize: 15 },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  modalView: {
    margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(200),
    height: scale(200),
  },
  btnClose: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  imgClose: { width: scale(10), height: scale(10) },
  titleModal: { fontWeight: 'bold', fontSize: scale(15), marginTop: scale(5) },
});

