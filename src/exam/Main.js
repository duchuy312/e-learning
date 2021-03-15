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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale } from 'react-native-size-matters';
import axiosRetry from 'axios-retry';
import axios from 'axios';

import { Header } from '../components/header';
//import DetailScreen from '../components/modal';
import { Clock } from '../../svg/icon';

const MainExam = ({ navigation }) => {
  axiosRetry(axios, { retries: 15 });

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [dataModal, setDataModal] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);
  const [getting, setGetting] = useState(false);

  const getValueSearch = (value) => {
    setValueSearch(value);
  };

  const getToken = async () => {
    const value = await AsyncStorage.getItem('@MyToken');
    if (value !== null) {
      setToken(value);
    }
  };

  const doST = () => {
    setModalVisible(true);
  };

  const getExam = async () => {
    await axios.post('http://elearning-uat.tmgs.vn/api/v2/competition/list/all',
      { categoryId: null, searchValue: valueSearch, typeMyCompetition: null },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGetting(true);
        // console.log(res.data.data);
        setData(res.data.data);
      }).catch(function (err) {
        console.log('err main', err);
      })
      .finally(() => {
        setGetting(false);
      });
  };

  useEffect(() => {
    getToken();
  });

  useEffect(() => {
    if (token.length > 0) {
      getExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch, token]);

  const renderItem = ({ item }) => {
    let  myDate = new Date(item.timeCreate);
    myDate = myDate.toLocaleString().slice(0,10);
    return (
      <View style={styles.contaiView}>
        <TouchableOpacity
          style={styles.inline}
          onPress={() => {
            navigation.navigate('DetailExam', { examID: item.id, token: token });
          }}>
          <Image
            style={styles.image}
            source={{
              uri:
                'http://elearning-uat.vnpost.vn/static/images/default_thumb_exam.png',
            }}
            resizeMode="contain"
          />
          <View style={styles.content}>
            <Text style={styles.titleContent}>{item.nameCompetition}</Text>
            <View style={styles.time}>
              <Clock style={styles.clockIcon} />
              <Text style={styles.txtTime}>
                {`Create Time: ${myDate}`}
              </Text>
            </View>
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
          refreshing={getting}
          onRefresh={() => getExam()}
          numColumns={'2'}
        />
      </View>
    </View>
  );
};

export default MainExam;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ddd', flexDirection: 'column' },
  /*------------------- */
  body: { flex: 9 },
  list: { flex: 1, marginTop: scale(20) },
  contaiView: {
    flex: 1,
    marginBottom: scale(10),
    marginLeft: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    marginHorizontal: scale(10),
    height: scale(200),
    flexDirection: 'column',
  },
  inline: { flexDirection: 'column' },
  image: {
    width: scale(140),
    height: scale(120),
    marginHorizontal: scale(5),
    borderRadius: 60,
  },
  content: {
    flexDirection: 'column',
    width: scale(150),
  },
  titleContent: { fontWeight: 'bold', fontSize: 15, width: '100%', marginVertical: scale(5) },
  time: { marginHorizontal: 2, flexDirection: 'row', marginVertical: scale(5) },
  txtTime: { fontSize: scale(10) },
  clockIcon: { width: scale(20), height: scale(20), marginRight: scale(5) },
  txtLine: { color: 'orange' },
  starLine: { flexDirection: 'row' },
  star: { width: scale(15), height: scale(15) },
  loading: { justifyContent: 'center', alignItems: 'center', marginTop: scale(12) },
  linesq: { width: '90%', height: scale(1), backgroundColor: 'orange', marginHorizontal: scale(10) },
  priceText: { fontSize: scale(20), marginHorizontal: scale(30), color: '#14bdee' },
  viewErr: { backgroundColor: 'pink', height: scale(70), justifyContent: 'center', alignItems: 'center' },
  txtErr: { fontSize: scale(20), color: 'red' },
  /*------------------- */
  modalStyles: {},
});
