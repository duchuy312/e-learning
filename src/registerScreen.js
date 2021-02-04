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

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [pass1, setPass1] = useState('');
  const RegisterConfirm = () => {
    axios
      .post('https://600685103698a80017de189e.mockapi.io/api/demo/UsersData', {
        username: name,
        email: email,
        phone: phone,
        pass: pass,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const ClearInput = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPass('');
    setPass1('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainerRegister}>
        <ImageBackground
          style={styles.logo}
          source={require('../img/logo.png')}
        />
      </View>
      <View style={styles.textInputContainerRegister}>
        <Text style={styles.titleText}>Đăng Ký tài Khoản</Text>
        <View style={styles.textInputArea}>
          <TextInput
            value={name}
            onChangeText={(nameinput) => setName(nameinput)}
            style={styles.textInput}
            placeholder={'   Tên đăng nhập'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={email}
            onChangeText={(emailinput) => setEmail(emailinput)}
            style={styles.textInput}
            placeholder={'   Email'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={phone}
            onChangeText={(phoneinput) => setPhone(phoneinput)}
            style={styles.textInput}
            placeholder={'   Số Điện Thoại'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass}
            onChangeText={(passinput) => setPass(passinput)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'   Mật khẩu'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass1}
            onChangeText={(passinput1) => setPass1(passinput1)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'   Nhập lại Mật khẩu'}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => [RegisterConfirm(), ClearInput()]}>
        <Text style={styles.text}>Đăng Ký</Text>
      </TouchableOpacity>
      <View style={styles.centerText}>
        <Text>Đã Có Tài Khoản ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linktext}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
        <Text style={styles.linktext}>Quên Mật Khẩu ?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterScreen;

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
  titleText: {
    alignSelf: 'center',
    fontSize: scale(20),
    color: 'orange',
    marginBottom: scale(20),
  },
  textInputContainerRegister: {
    height: scale(400),
    width: scale(350),
  },
  logocontainerRegister: {
    marginTop: scale(30),
    height: scale(100),
    width: scale(350),
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
