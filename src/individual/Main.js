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

const MainIndividual = ({navigation}) => {
  const [token, setToken] = useState('');

  const getToken = async () => {
    const value = await AsyncStorage.getItem('@MyToken');
    if (value !== null) {
      setToken(value);
    }
  };

  useEffect(() => {
    getToken();
  });

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
          onPress={() => navigation.navigate('UserInfor', {token: token})}>
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
