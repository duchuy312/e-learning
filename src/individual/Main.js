/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import Backbar from '../components/BackBar';
import {scale} from 'react-native-size-matters';
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
        'http://elearning-uat.tmgs.vn/api/competition/my-competition/statistical',
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
      .get('http://elearning-uat.tmgs.vn/api/profile/detail', {
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
      <Backbar title={'Trang cá nhân'} />
      <View style={styles.logocontainer}>
        <View style={styles.circle}>
          <ImageBackground
            style={styles.logo}
            source={require('../../img/logo.png')}
          />
        </View>
      </View>
      <View>
        <Text style={styles.user}>{dataUser.fullName}</Text>
        <Text style={styles.email}>Email: {dataUser.email}</Text>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UserInfor', {
              name: dataUser.fullName,
              title: dataUser.title,
              email: dataUser.email,
              gender: dataUser.gender,
              place: dataUser.place,
              company: dataUser.poscodeName,
              phone: dataUser.phoneNumber,
              birth: dataUser.birthday,
              avatar: dataUser.imageUsers,
              UserTK: token,
              percentPoint: dataHistory.percentMediumPoint,
            })
          }>
          <Text style={styles.text}>Thông tin tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('History', {
              idUser: dataUser.id,
              email: dataUser.email,
              avatar: dataUser.imageUsers,
              name: dataUser.fullName,
              nameCompetition: dataHistory.nameCompetition,
              imageCompetition: dataHistory.imageCompetition,
              percentPoint: dataHistory.percentMediumPoint,
              percentTrue: dataHistory.percentMediumQuestion,
              pass: dataHistory.qualified,
            })
          }>
          <Text style={styles.text}>Xem lịch sử thi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() =>
            navigation.navigate('ResetPass', {
              UserToken: token,
              id: dataUser.id,
            })
          }>
          <Text style={styles.text2}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.text2}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logocontainer: {
    marginTop: scale(20),
    height: scale(150),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  email: {
    marginTop: 5,
    fontSize: 20,
    alignSelf: 'center',
  },
  view: {
    flex: 5,
    marginTop: 30,
  },
  circle: {
    height: scale(150),
    width: scale(150),
    borderRadius: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(3),
    borderColor: '#f4f2f2',
  },
  logo: {
    flex: 1,
    marginTop: scale(30),
    height: scale(80),
    width: scale(120),
    alignSelf: 'center',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: scale(18),
    color: 'white',
  },
  button2: {
    backgroundColor: '#E5E5E5',
    marginTop: 10,
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#FCB71E',
    marginBottom: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  button3: {
    backgroundColor: '#E5E5E5',
    marginTop: 5,
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#FCB71E',
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text2: {
    fontSize: scale(18),
    color: 'orange',
  },
});
