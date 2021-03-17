/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import axios from 'axios';

const MainIndividual = ({navigation}) => {
  const [token, setToken] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [count, setCount] = useState(0);
  const getUserInfor = async () => {
    await getToken();
    await axios
      .get('http://elearning-uat.tmgs.vn/api/profile/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDataUser(res.data.data);
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      });
  };
  const getToken = async () => {
    const value = await AsyncStorage.getItem('@MyToken');
    if (value !== null) {
      setToken(value);
    }
  };

  useEffect(() => {
    getUserInfor();
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <ImageBackground
          style={styles.logo}
          source={require('../../img/logo.png')}
        />
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UserInfor', {
              name: dataUser.fullName,
              email: dataUser.email,
              gender: dataUser.gender,
              place: dataUser.place,
              company: dataUser.poscodeName,
              phone: dataUser.phoneNumber,
              birth: dataUser.birthday,
              avatar: dataUser.imageUsers,
              token: token,
              idUser: dataUser.id,
              username: dataUser.username,
              birthday: dataUser.birthDateFomatted,
              url: `http://elearning-uat.tmgs.vn${dataUser.imageUsers}`,
            })
          }>
          <Text style={styles.text}>{'Thông tin cá nhân'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChangePass', {token: token})}>
          <Text style={styles.text}>{'Mật khẩu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{'Đăng xuất'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  logocontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: scale(200),
    height: scale(120),
    borderRadius: scale(50),
    marginVertical: scale(20),
  },
  //-----------------body-----------------------
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: scale(250),
    height: scale(40),
    backgroundColor: 'orange',
    marginVertical: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
  text: {fontSize: scale(20), color: '#fff'},
});
