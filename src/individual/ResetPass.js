/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
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
// import PasswordField from 'react-native-password-field';

const ResetPass = ({navigation}) => {
  const [password, setPassword] = React.useState('');
  const [newpass, setNewpass] = React.useState('');
  // const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text1}>Mật khẩu</Text>
        {/* <PasswordField
          placeholder={'Password'}
          passwordValue={this.state.password}
          backgroundColor={'white'}
          textColor={'black'}
          onChangeText={(password) => this.setState({password: password})}
        /> */}
        <TextField
          containerStyle={styles.textInput}
          label="Mật Khẩu cũ"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Mật Khẩu mới"
          value={newpass}
          onChangeText={(text) => {
            setNewpass(text);
          }}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Nhập lại mật khẩu"
        />
        <TouchableOpacity
          style={styles.button3}
          onPress={() => navigation.navigate('ForgotPassScreen')}>
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
