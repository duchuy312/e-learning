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

const MainCourse = ({ navigation }) => {
  axiosRetry(axios, { retries: 15 });

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [dataModal, setDataModal] = useState([]);
  const [valueSearch, setValueSearch] = useState(null);
  const [getting, setGetting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const getCourse = async () => {
    await axios.post('http://elearning-uat.tmgs.vn/api/course',
      { categoryId: null, name: valueSearch },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGetting(true);
        setData(res.data.data);
        // console.log(res.data.data);
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
      getCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch, token]);

  const renderItem = ({ item }) => {
    const start = item.courseConfig.start.slice(0, 11);
    const end = item.courseConfig.end.slice(0, 11);
    return (
      <View style={styles.contaiView}>
        <TouchableOpacity
          style={styles.inline}
          onPress={() => {
            setSelectedId(item.id);
            navigation.navigate('Chi tiết khóa học', { courseID: item.id, token: token });
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
            <View style={styles.linesq} />
            {
              (item.price === null || item.price === 0) ? <Text style={styles.priceText}>Miễn Phí</Text>
                : <Text style={styles.priceText}>{item.price}</Text>
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
          extraData={selectedId}
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
    width: scale(120),
    height: scale(130),
    margin: scale(5),
    borderRadius: 60,
  },
  content: {
    flexDirection: 'column',
    width: scale(200),
  },
  titleContent: { fontWeight: 'bold', fontSize: 15, width: '100%', marginVertical: scale(7) },
  time: { marginHorizontal: 2, flexDirection: 'row', marginVertical: scale(7) },
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
