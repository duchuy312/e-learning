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

import StarRating from '../components/Star';

function DetailCourse({ route, navigation }) {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [appear, setAppear] = useState(false);

  const { courseID, token } = route.params;
 // console.log(courseID, token);
  const getDetail = () => {
    axios.get(`http://elearning-uat.vnpost.vn/api/course/${courseID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAppear(true);
        setData(res.data.data);
        //console.log('star', data.rates[0].valuess);
        if (data.rates[0].valuess === null && data.rates[0].valuess === 0 && data.rates[0].valuess === undefined) {
          setRating(0);
        }
        else {
          setRating(data.rates[0].valuess);
        }
        //console.log(data.courseConfig.start.slice(0, 10));
      });
  };

  useEffect(() => {
    if (token.length > 0) {
      getDetail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'http://elearning-uat.vnpost.vn/static/images/default_thumb_course.png',
        }}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>
        <Text>{`Create by: ${data.createdBy}`}</Text>
        {
          (appear === true) && <StarRating ratings={rating} />
        }
        {
          //   <View style={styles.inLine}>
          //   <Text style={styles.blurText}>{`Bắt đầu: ${data.courseConfig.start.slice(0, 10)}`}</Text>
          //   <Text style={styles.blurText}>{`Kết thúc: ${data.courseConfig.end.slice(0, 10)}`}</Text>
          // </View>
        }
        <View style={styles.overBtn}>
          <TouchableOpacity
            style={styles.buttonDK}
            onPress={() => {
              navigation.navigate('RegisterCourse');
            }}>
            <Text style={styles.txtBtnDK}>{'Đăng kí học'}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});
