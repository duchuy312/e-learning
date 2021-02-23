/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StarRating from '../components/Star';

function DetailCourse () {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [startT, setStartT] = useState('');
  const [endT, setEndT] = useState('');
  const [rating, setRating] = useState(0);
  const [token, setToken] = useState('');
  const [courseId, setCourseID] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
        //console.log('We have Token');
        setToken(value);
      } else {
        //console.log('Dont have Token');
      }
      const courseId = await AsyncStorage.getItem('@courseID');
      if(courseId !== null) {
        setCourseID(courseId);
      }
      else {
        console.log('cant get course id in detail');
      }
    } catch (err) {
      console.log('Read data token in course error');
    }
  };

  const getDetail = async () => {
    await axios.get(`http://elearning-uat.vnpost.vn/api/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setData(res.data.data);
        setStartT(data.courseConfig.start.slice(0, 11));
        setEndT(data.courseConfig.end.slice(0, 11));

      });


      // await axios
      // .get(`http://elearning-uat.vnpost.vn/api/v2/course/rating/${courseId}`, {
      //   header: {Authorization: `Bearer ${token}`},
      // })
      // .then((res) => {
      //   console.log(res);
      //   setRating(res.data.avarageRate);
      // })
      // .catch(function (err) {
      //   console.log('getting rating err', err);
      // });
  };


  useEffect(() => {
    getData();
    getDetail();
  }, [] );

  return (
    <View style={styles.container}>
    {
        // <Image
        //   source={require('../../img/image15.png')}
        //   style={styles.img}
        // />
        // <View style={styles.content}>
        //   <Text style={styles.title}>{data.name}</Text>
        //   <Text>{'Giảng viên: Nguyễn Bích Ngọc'}</Text>
        //   <View style={styles.inLine}>
        //     <View style={styles.process}>
        //       <View style={styles.inProcess} />
        //     </View>
        //     <Text style={styles.txtPercent}>{'70%'}</Text>
        //   </View>
        //   <StarRating star={rating}/>
        //   <Text style={styles.blurText}>{'Số lượng học viên: 90'}</Text>
        //   <View style={styles.inLine}>
        //     <Text style={styles.blurText}>{`Bắt đầu: ${startT}`}</Text>
        //     <Text style={styles.blurText}>{`Kết thúc: ${endT}`}</Text>

        //   </View>
        //   <View style={styles.overBtn}>
        //     <TouchableOpacity
        //       style={styles.buttonDK}
        //       onPress={() => {
        //         navigation.navigate('RegisterCourse  ');
        //       }}>
        //       <Text style={styles.txtBtnDK}>{'Đăng kí học'}</Text>
        //     </TouchableOpacity>
        //   </View>
        // </View>

            }
    </View>
  );
};

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
  title: { fontWeight: 'bold' , fontSize: scale(20)},
  process: {
    width: 100,
    height: 5,
    backgroundColor: '#aaa',
    marginTop: 5,
    marginRight: 5,
  },
  inProcess: { width: 70, height: 5, backgroundColor: 'orange' },
  txtPercent: { color: 'orange' },
  inLine: { flexDirection: 'row', alignItems: 'center' },
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
});
