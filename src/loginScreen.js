import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {XIcon, CheckIcon} from '../svg/icon';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@MyToken', value);
    } catch (err) {
      console.log('Saving error');
    }
  };
  const LoginConfirm = async () => {
    await axios
      .post('https://elearning.tmgs.vn/api/authentication', {
        username: name,
        password: pass,
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          storeToken(response.data.data.token);
          console.log('Login Success');
          setModalVisible1(true);
        } else {
          console.log('Đăng nhập thất bại');
        }
      })
      .catch(function (error) {
        console.log(error);
        setModalVisible(true);
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          style={styles.smallCenteredView}
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.smallModalView}>
            <View style={styles.modalCenter}>
              <View style={styles.circleX}>
                <XIcon />
              </View>
              <Text style={styles.smallModalText}>
                Đăng nhập không thành công, vui lòng kiểm tra tên đăng nhập hoặc
                mật khẩu
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity
          style={styles.smallCenteredView}
          onPress={() => {
            navigation.navigate('BottomTabNavigations');
            setModalVisible1(false);
          }}>
          <View style={styles.smallModalView}>
            <View style={styles.modalCenter}>
              <CheckIcon />

              <Text style={styles.smallModalText}>Đăng nhập thành công</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  smallCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
  },
  smallModalView: {
    height: scale(300),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'center',
    padding: scale(8),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
  },
  modalCenter: {
    justifyContent: 'space-between',
    height: scale(150),
    alignItems: 'center',
  },
  circleX: {
    height: scale(140),
    width: scale(140),
    borderRadius: scale(70),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
