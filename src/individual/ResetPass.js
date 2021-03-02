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
    if (pass1 === pass2) {
      ResetPassword();
    } else {
      console.log('Xin vui lòng kiểm tra lại mật khẩu vừa nhập');
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
        <Text style={styles.text1}>Mật khẩu</Text>
        <TextField
          containerStyle={styles.textInput}
          label="Mật Khẩu cũ"
          value={pass}
          onChangeText={(passinput) => setPass(passinput)}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Mật Khẩu mới"
          value={pass1}
          onChangeText={(pass1input) => setPass1(pass1input)}
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Nhập lại mật khẩu"
          value={pass2}
          onChangeText={(repassinput) => setPass2(repassinput)}
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button3}
          onPress={() => ChangeConfirm()}>
          <Text style={styles.linktext}>Cập nhật mật khẩu mới</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  container: {flex: 1},
  textInput: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  linktext: {
    fontSize: scale(18),
    color: 'orange',
  },
  button3: {
    backgroundColor: '#E5E5E5',
    marginTop: 10,
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
