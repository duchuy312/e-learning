import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();
  const [loginToken, setLoginToken] = useState('');
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@MyToken', value);
      console.log(value);
    } catch (err) {
      console.log('Saving error');
    }
  };
  const LoginConfirm = () => {
    axios
      .post('http://elearning-uat.vnpost.vn/api/authentication', {
        username: name,
        password: pass,
      })
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          storeToken(response.data.data.token);
          console.log(response.data.data.token);
        } else {
          console.log(
            'Đăng nhập thất bại, vui lòng kiểm tra lại tên tài khoản hoặc mật khẩu !!!',
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        navigation.navigate('News');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <ImageBackground
          style={styles.logo}
          source={require('../img/logo.png')}
        />
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputArea}>
          <TextInput
            value={name}
            onChangeText={(nameinput) => setName(nameinput)}
            style={styles.textInput}
            placeholder={'Tên đăng nhập'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass}
            onChangeText={(passinput) => setPass(passinput)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Mật khẩu'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => LoginConfirm()}>
        <Text style={styles.text}>Đăng Nhập</Text>
      </TouchableOpacity>
      <View style={styles.centerText}>
        <Text>Chưa Có Tài Khoản ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.linktext}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
        <Text style={styles.linktext}>Quên Mật Khẩu ?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    height: scale(230),
    width: scale(375),
  },
  logocontainer: {
    marginTop: scale(80),
    height: scale(160),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: scale(69),
    width: scale(100),
    alignSelf: 'center',
  },
  textInputContainer: {
    height: scale(150),
    width: scale(350),
  },
  textInputArea: {
    backgroundColor: '#F6F4F5',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
  },
  textInput: {
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    fontSize: scale(18),
    marginLeft: scale(30),
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
  centerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(5),
  },
  linktext: {
    fontSize: scale(12),
    color: '#2787CD',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
