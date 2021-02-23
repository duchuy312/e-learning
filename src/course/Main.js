/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';
import axiosRetry from 'axios-retry';
import axios from 'axios';

import { Header } from '../components/header';
import StarRating from '../components/Star';
//import DetailScreen from '../components/modal';
import { Clock } from '../../svg/icon';

const MainCourse = ({ navigation }) => {
  axiosRetry(axios, { retries: 15 });

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [dataModal, setDataModal] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(0);
  const [courseID, setCourseID] = useState('');
  const [getting, setGetting] = useState(false);

  const getValueSearch = (value) => {
    //console.log(value);
    setValueSearch(value);
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
       // console.log('We have Token');
        setToken(value);
      } else {
        //console.log('Dont have Token');
      }
    } catch (err) {
     // console.log('Read data error');
    }
   // console.log('Done.');
  };

  const doST = () => {
    setModalVisible(true);
  };

  const getCourse = async () => {
    await axios.post('http://elearning-uat.vnpost.vn/api/course',
      {categoryId: null, name: valueSearch },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.json);
        setGetting(true);
        setData(res.data.data);
        // console.log('hello');
        res.data.data.length === null ? setLoading(loading + 1) : null;
        console.log(data);
      }).catch(function (err) {
        // handle error
        setLoading(loading + 1);
        //console.log(error);
      })
      .finally(() => {
       // console.log(data);
        setGetting(false);
      });
  };

  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    if (token.length > 0) {
      getCourse();
    }
  }, [valueSearch, token, loading]);

  const renderItem = ({ item }) => {
    //console.log(item.id);
    const start = item.courseConfig.start.slice(0, 11);
    const end = item.courseConfig.end.slice(0, 11);
    setCourseID(item.id);
    return (
      <View style={styles.contaiView}>
        <TouchableOpacity
          style={styles.inline}
          onPress={() => {
            navigation.navigate('TopTabCourse', {
              courseID: item.id,
            });
          }}>
          <Image
            style={styles.image}
            source={require('../../img/image11.png')}
            resizeMode="contain"
          />
          <View style={styles.content}>
            <Text style={styles.titleContent}>{item.name}</Text>
            <Text>{`Create by: ${item.createdBy}`}</Text>
            <View style={styles.time}>
              <Clock style={styles.clockIcon} />
              <Text>
                {start} – {end}
              </Text>
            </View>
            {
              // <View style={styles.line}>
              //   <View style={styles.backLine}>
              //     <View style={styles.frontLine} />
              //   </View>
              //   <Text style={styles.txtLine}>{'70%'}</Text>
              // </View>
              // <StarRating ratings={rating} />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        getValueSearch={getValueSearch}
        doST={doST}
        textInputHolder="Tìm kiếm"
      />
      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={courseID}
          refreshing={getting}
          onRefresh={() => getCourse()}
        />
      </View>
    </View>
  );
};

export default MainCourse;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ddd' },

  /*------------------- */
  body: { flex: 9 },
  list: { flex: 1, marginTop: scale(20) },
  contaiView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: scale(10),
    marginLeft: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    marginHorizontal: scale(10),
  },
  inline: { flexDirection: 'row' },
  image: {
    width: scale(110),
    height: scale(120),
    margin: scale(5),
    borderRadius: 60,
  },
  content: {
    flexDirection: 'column',
    width: scale(200),
  },
  titleContent: { fontWeight: 'bold', fontSize: 15, width: '100%' , marginVertical: scale(7)},
  time: { marginHorizontal: 2, flexDirection: 'row', marginVertical: scale(7)},
  clockIcon: { width: scale(20), height: scale(20), marginRight: scale(5) },
  line: { flexDirection: 'row', alignItems: 'center' },
  backLine: {
    width: scale(100),
    height: scale(5),
    backgroundColor: '#ddd',
    marginTop: scale(5),
    marginRight: scale(5),
  },
  frontLine: { width: scale(70), height: scale(5), backgroundColor: 'orange' },
  txtLine: { color: 'orange' },
  starLine: { flexDirection: 'row' },
  star: { width: scale(15), height: scale(15) },
  loading: { justifyContent: 'center', alignItems: 'center', marginTop: scale(12) },
  modalStyles: {},
});
