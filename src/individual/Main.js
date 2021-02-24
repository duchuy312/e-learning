import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import TitleBar from '../components/TitleBar';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MainIndividual = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
        console.log('We have Token');
        setToken(value);
      } else {
        console.log('Dont have Token');
      }
    } catch (err) {
      console.log('Read data error');
    }
    console.log('Done.');
  };
  const getdata = async () => {
    await getToken();
    await axios
      .get(
        'http://elearning-uat.vnpost.vn/api/competition/my-competition/statistical',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setDataHistory(response.data.data);
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      })
      .finally(() => {
        console.log(dataHistory);
        dataHistory.length === 0 ? setCount(count + 1) : null;
      });
    await axios
      .get('http://elearning-uat.vnpost.vn/api/profile/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDataUser(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log(dataUser);
        dataUser.length === 0 ? setCount(count + 1) : null;
      });
  };
  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TitleBar title1={'Trang cá nhân'} />
      <View style={styles.avatarContainer}>
        <View style={styles.circle}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
        </View>
      </View>
      <Text style={styles.NameText}>Admin</Text>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UserInfo', {
              name: dataUser.fullName,
              email: dataUser.email,
              gender: dataUser.gender,
              place: dataUser.place,
              company: dataUser.poscodeName,
              phone: dataUser.phoneNumber,
              birth: dataUser.birthday,
              avatar: dataUser.imageUsers,
              UserTK: token,
            })
          }>
          <Text style={styles.ButtonText}>Thông tin tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ExamHistory', {
              testDone: dataHistory.imqualified,
              testWait: dataHistory.waitingConfirm,
              percentPoint: dataHistory.percentMediumPoint,
              percentTrue: dataHistory.percentMediumQuestion,
              pass: dataHistory.qualified,
            })
          }>
          <Text style={styles.ButtonText}>Xem lịch sử thi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.Button1Text}>Đăng xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button1}
          onPress={() =>
            navigation.navigate('ChangePass', {
              UserToken: token,
              id: dataUser.id,
            })
          }>
          <Text style={styles.Button1Text}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', alignItems: 'center'},
  avatarContainer: {
    marginTop: scale(60),
    height: scale(160),
    width: scale(160),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: scale(2),
    elevation: scale(5),
    borderRadius: scale(80),
    overflow: 'hidden',
    borderColor: 'white',
  },
  circle: {
    height: scale(90),
    width: scale(100),
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  NameText: {
    fontSize: scale(18),
    marginTop: scale(10),
  },
  button: {
    backgroundColor: '#FCB71E',
    width: scale(290),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    width: scale(290),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#FCB71E',
  },
  ButtonText: {
    fontSize: scale(18),
    color: 'white',
  },
  Button1Text: {
    fontSize: scale(18),
    color: '#FCB71E',
  },
  ButtonContainer: {
    marginTop: scale(30),
  },
});
