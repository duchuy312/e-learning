/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Backbar from '../components/BackBar';

const ResetPass = () => {
  const [idenUser] = useState('route.params.id');
  const [pass, setPass] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  console.log(token);
  useEffect(() => {
    setToken(route.params.UserToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ChangeConfirm = () => {
    if (pass === null || pass1 === null || pass2 === null) {
      Alert.alert('Không được để trống!');
    } else if (pass === pass1) {
      Alert.alert('Mật khẩu mới trùng với mật khẩu cũ');
    } else if (pass1 === pass2) {
      ResetPassword();
    } else {
      Alert.alert('Mật khẩu mới không khớp');
    }
  };
  const ResetPassword = () => {
    axios
      .put(
        'http://elearning-uat.vnpost.vn/api/profile/password',
        {
          id: route.params.id,
          password: pass1,
          oldPassword: pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          console.log('Change Success');
        } else {
          console.log('Cannot change password');
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
      <ScrollView>
        <Backbar title={'Đổi mật khẩu'}></Backbar>
        <View style={{marginTop: 100}}>
          <View style={styles.textInputArea}>
            <TextInput
              value={pass}
              onChangeText={(passinput) => setPass(passinput)}
              style={styles.textInput1}
              placeholder={'Mật khẩu hiện tại'}
            />
          </View>
          <View style={styles.textInputArea}>
            <TextInput
              value={pass1}
              onChangeText={(pass1input) => setPass1(pass1input)}
              style={styles.textInput1}
              placeholder={'Mật khẩu mới'}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.textInputArea}>
            <TextInput
              value={pass2}
              onChangeText={(repassinput) => setPass2(repassinput)}
              style={styles.textInput1}
              placeholder={'Nhập lại mật khẩu mới'}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => ChangeConfirm()}>
          <Text style={styles.linktext}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  textInput: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  textInputArea: {
    backgroundColor: '#E5E5E5',
    marginTop: 20,
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textInput1: {
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    fontSize: scale(18),
    marginLeft: scale(30),
  },
  linktext: {
    fontSize: scale(18),
    color: 'white',
  },
  button3: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginTop: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text1: {
    marginTop: 20,
    fontSize: 20,
    color: 'red',
  },
  text2: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});