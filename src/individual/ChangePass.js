/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
//https://github.com/react-native-datetimepicker/datetimepicker#display-optional
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';

import {Backbar} from '../components/BackBar';

const ChangePass = ({navigation, route}) => {
  const {token} = route.params;

  const [oldPass, setOldPass] = useState([]);
  const [newPass, setNewPass] = useState([]);
  const [reNewPass, setReNewPass] = useState([]);
  const [userID, setUserID] = useState('');
  //handle render notification text
  const [done, setDone] = useState(false);
  const [press, setPress] = useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@UserID');
    if (value !== null) {
      setUserID(value);
    }
  };

  const ChangeConfirm = () => {
    if (reNewPass === newPass) {
      ChangePass();
    } else {
      Alert.alert(
        'Mật khẩu nhập lại chưa đúng, mời nhập lại',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  };

  function ChangePass() {
    axios
      .put(
        'http://elearning-uat.tmgs.vn/api/profile/update',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          body: {id: userID},
          password: newPass,
          oldPassword: oldPass,
        },
      )
      .then((res) => {
        setDone(true);
      });
  }

  useEffect(() => {
    getData();
  });

  return (
    <View style={styles.container}>
      <Backbar title={'Đổi mật khẩu'} />
      <View style={styles.logocontainer}>
        <ImageBackground
          style={styles.logo}
          source={require('../../img/logo.png')}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.inline}>
          <Text style={styles.txt}>{'Mật khẩu cũ'}</Text>
          <TextInput
            style={styles.textInput}
            value={oldPass}
            onChangeText={(t) => {
              setOldPass(t);
            }}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.txt}>{'Mật khẩu mới'}</Text>
          <TextInput
            style={styles.textInput}
            value={newPass}
            onChangeText={(t) => {
              setNewPass(t);
            }}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.txt}>{'Nhập lại mật khẩu'}</Text>
          <TextInput
            style={styles.textInput}
            value={reNewPass}
            onChangeText={(t) => {
              setReNewPass(t);
            }}
          />
        </View>
        <View style={styles.contaiButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              ChangeConfirm();
              setPress(true);
            }}>
            <Text style={{color: 'white'}}>{'Cập nhật mật khẩu mới'}</Text>
          </TouchableOpacity>
          {done === true && press === true ? (
            <Text style={styles.notificationTxt}>
              Bạn đã cập nhật mật khẩu thành công
            </Text> ? (
              done === false && press === true
            ) : (
              <Text style={styles.notificationTxt}>
                Bạn chưa cập nhật mật khẩu thành công
              </Text>
            )
          ) : (
            <Text style={styles.notificationTxt} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  inline: {
    flexDirection: 'row',
    marginVertical: scale(10),
    marginHorizontal: scale(20),
  },
  textInput: {width: scale(200), height: scale(40), borderWidth: scale(1)},
  txt: {width: scale(100), fontSize: scale(15)},
  button: {
    width: scale(200),
    height: scale(50),
    backgroundColor: 'orange',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contaiButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  body: {flex: 1},
  notificationTxt: {color: 'red'},
});
