/* eslint-disable no-unused-vars */

import React, {useState} from 'react';
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

import {scale} from 'react-native-size-matters';

const MainIndividual = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <ImageBackground
          style={styles.logo}
          source={require('../../img/logo.png')}
        />
      </View>
      <View>
        <Text style={styles.user}>Người dùng</Text>
      </View>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserInfor')}>
          <Text style={styles.text}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.text}>Xem lịch sử thi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.text2}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {flex: 1},
  logocontainer: {
    flex: 2,
    marginTop: scale(80),
    height: scale(80),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontSize: 20,
    fontStyle: 'italic',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 5,
    marginTop: 30,
  },
  logo: {
    flex: 1,
    height: scale(80),
    width: scale(120),
    alignSelf: 'center',
    borderRadius: scale(80),
    backgroundColor: 'orange',
  },
  button: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
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
    marginTop: 30,
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
