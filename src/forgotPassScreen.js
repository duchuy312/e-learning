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

const ForgotPassScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const SendEmail = () => {
    axios
      .post(
        'http://elearning-uat.vnpost.vn/api/profile/password',
        {
          username: name,
          email: email,
        },
        {
          headers: {},
        },
      )
      .then(function (response) {
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Success');
        } else {
          console.log('Failer');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        navigation.navigate('LoginScreen');
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
            placeholder={' Username'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={email}
            onChangeText={(emailinput) => setEmail(emailinput)}
            style={styles.textInput}
            placeholder={' Email'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => SendEmail()}>
        <Text style={styles.text}>Send Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.linktext}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgotPassScreen;

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
    height: scale(140),
    width: '100%',
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
