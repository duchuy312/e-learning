import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Pressable,
} from 'react-native';

//  import * as React from 'react';
import {RadioButton} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
// import Navigation from '../../Navigation/navigations';
import Backbar from '../components/BackBar';
import axios from 'axios';
const TestChoice = ({route}) => {
  const [checked, setChecked] = React.useState();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sendId, setSendId] = useState('');
  const navigation = useNavigation();
  // const route = useRoute();
  const {tokenResult, idChoice, nameRoundC, idRound} = route.params;
  const requestByCode = async () => {
    await axios
      .post(
        `http://elearning-uat.vnpost.vn/api/roundtest/${idChoice}/inputCode/GoDOIYzHAiqN8l`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenResult}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === 'Thành công') {
          console.log('success');
        } else {
          console.log('that bai');
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  };
  function Check() {
    setShow(!show);
    setChecked('first');
  }
  function checkCode() {}
  // console.log('get', tokenResult);
  return (
    <View style={styles.container}>
      <View /*style={{ flex: 1 }}*/>
        <Backbar title="    Tên kỳ thi" />
      </View>
      <View style={{flex: 9}}>
        <Text style={styles.textTittle}>Chọn phương thức đăng ký thi:</Text>
        <View style={styles.containerRadio}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => Check()}
            color="#144E8C"
          />
          <Text style={{fontSize: scale(15), alignSelf: 'center'}}>
            Đăng ký bằng mã code
          </Text>
        </View>
        <View style={styles.containerRadio}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
            color="#144E8C"
          />

          <Text style={{fontSize: scale(15), alignSelf: 'center'}}>
            Đăng ký chờ phê duyệt
          </Text>
        </View>

        {show === true ? (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      requestByCode();
                      setModalVisible(!modalVisible);
                      navigation.navigate('TestListRound', {
                        nameRoundR: nameRoundC,
                        tokenR: tokenResult,
                        idRoundR: idRound,
                      });
                    }}>
                    <Image
                      source={require('../../img/Tick.png')}
                      style={{width: scale(52), height: scale(38)}}
                    />
                  </Pressable>
                  <Text style={{paddingTop: scale(20)}}>
                    Đăng ký thành công!
                  </Text>
                </View>
              </View>
            </Modal>
            <TextInput
              style={styles.txtInput}
              onChangeText={(inputCode) => setCode(inputCode)}
              value={code}
              placeholder={'Nhập mã cuộc thi'}
            />

            <TouchableOpacity
              style={styles.buttonActive}
              onPress={() => setModalVisible(true)}>
              <Text style={{color: '#FFF', fontSize: scale(15)}}>
                Gửi yêu cầu
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text>Bạn không có mã phòng thi ?{nameRoundC}</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.buttonInactive}>
            <Text style={{color: '#FFF', fontSize: scale(15)}}>
              Gửi yêu cầu
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default TestChoice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textTittle: {
    fontSize: scale(20),
    fontWeight: '700',
    paddingTop: scale(90),
    alignSelf: 'center',
    paddingBottom: scale(15),
  },
  containerRadio: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonActive: {
    width: scale(300),
    height: scale(45),
    borderRadius: scale(20),
    backgroundColor: '#FCB71E',
    marginTop: scale(30),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInactive: {
    width: scale(300),
    height: scale(45),
    borderRadius: scale(20),
    backgroundColor: '#C4C4C4',
    marginTop: scale(30),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInput: {
    width: scale(300),
    height: scale(45),
    borderRadius: scale(20),
    backgroundColor: '#F6F4F5',
    alignSelf: 'center',
    paddingHorizontal: 100,
    marginTop: scale(20),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: 'rgba(100,100,100,0.5)',
    height: scale(300),
    width: '100%',
  },
  modalView: {
    // margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(290),
    height: scale(240),
  },
  button: {
    borderRadius: scale(40),
    width: scale(80),
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FCB71E',
  },
});
