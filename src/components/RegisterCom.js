/* eslint-disable no-lone-blocks */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import {Backbar} from '../components/BackBar';

export default function RegisterCourse({navigation, route}) {
  axiosRetry(axios, {retries: 3});

  const {token, courseID, courseName} = route.params;

  //check user register by code or by accept
  const [byCode, setByCode] = useState(false);
  const [byAccept, setByAccept] = useState(false);
  //code that user write
  const [value, onChangeText] = useState(0);
  //-----------------------TÍ XÓA----------------------------
  const [modalVisible, setModalVisible] = useState(true);
  //check render view register by code
  const [view, setView] = useState(false);

  const pressByCode = () => {
    setByCode(true);
    setByAccept(false);
  };

  const pressByAccept = () => {
    setByCode(false);
    setByAccept(true);
  };

  function postCode() {
    axios
      .post(
        'http://elearning-uat.vnpost.vn/api/course/request-code',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          body: {
            courseId: courseID,
            courseCode: value,
          },
        },
      )
      .then((res) => {
        //-----------------------------SHOULD CHECK(do not have code to check)-----------------------------------
        navigation.navigate('DetailCourse');
      });
  }

  function postRequestAccept() {
    axios
      .get(`http://elearning-uat.vnpost.vn/api/course/request/${courseID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //-----------------------------400 ERR-----------------------------------
        console.log('a');
        // if(res)
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.bold}>{'Chọn phương thức đăng kí học'}</Text>
        <View style={styles.inline}>
          <TouchableOpacity
            style={styles.bigCircle}
            onPress={() => pressByCode()}>
            {byCode === true && <View style={styles.smallCircle} />}
          </TouchableOpacity>
          <Text>{'Đăng kí bằng mã code'}</Text>
        </View>
        <View style={styles.inline}>
          <TouchableOpacity
            style={styles.bigCircle}
            onPress={() => pressByAccept()}>
            {byAccept === true && <View style={styles.smallCircle} />}
          </TouchableOpacity>
          <Text>{'Đăng kí chờ phê duyệt'}</Text>
        </View>
        {/**-----------Check radio button -----------*/}
        {
          //by code => btn change color  && render text input for user to write code => post code
          //by accept => btn change color && post request
          //default: btn send request has GRAY COLOR
        }
        {byCode === true ? (
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={(t) => onChangeText(t)}
              value={value}
              placeholder="Nhập mã lớp học"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.requestedBtn}
              onPress={() => {
                postCode();
              }}>
              <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
            </TouchableOpacity>
          </View>
        ) : byAccept === true ? (
          <View>
            <TouchableOpacity
              style={styles.requestedBtn}
              onPress={() => {
                postRequestAccept();
              }}>
              <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.requestBtn}>
            <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  /**---------------Body------------------ */
  body: {
    flex: 9,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {fontWeight: 'bold', fontSize: 20},
  inline: {flexDirection: 'row', marginVertical: 10},
  bigCircle: {
    borderWidth: 1,
    borderColor: '#144e8c',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  smallCircle: {
    backgroundColor: '#144e8c',
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  requestBtn: {
    backgroundColor: '#aaa',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestedBtn: {
    backgroundColor: 'orange',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRequest: {color: '#fff'},
  textInput: {
    width: 200,
    height: 40,
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#bbb',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //----------------set Modal khi chon dang ki bang ma code-----------------
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: '#aaa',
  },
  modalView: {
    margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(200),
    height: scale(200),
  },
  btnClose: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  imgClose: {width: scale(10), height: scale(10)},
  titleModal: {fontWeight: 'bold', fontSize: scale(15), marginTop: scale(5)},
  //----------------set Modal khi chon dang ki bang phe duyet-----------------
  modalOver: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: '#aaa',
  },
  modalContai: {
    margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    alignItems: 'center',
    width: scale(250),
    height: scale(250),
  },
  circleTick: {
    marginTop: scale(40),
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: scale(50),
  },
  imgTick: {width: scale(70), height: scale(70)},
  btnCourse: {
    width: scale(100),
    height: scale(40),
    backgroundColor: 'orange',
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCourse: {color: '#fff'},
});
