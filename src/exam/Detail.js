/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';

import { scale } from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';

function DetailExam({ route, navigation }) {
  axiosRetry(axios, { retries: 3 });
  const [data, setData] = useState([]);
  const [examName, setExamName] = useState('');
  const [time, setTime] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [publicExam, setPublicExam] = useState(false);
  const [getting, setGetting] = useState(false);
  const [roundID, setRoundID] = useState(0);
  //check user register by code or by accept
  const [byCode, setByCode] = useState(false);
  const [byAccept, setByAccept] = useState(false);
  const [value, onChangeText] = useState(0);
  const [visibleText, setVisibleText] = useState(false);
  const [nameRound, setNameRound] = useState('');

  const { examID, token } = route.params;
  // console.log(examID);

  function getListRoundTest() {
    axios.get(`http://elearning-uat.tmgs.vn/api/competition/${examID}/roundTest/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        // console.log('data', res.data.data);
        setData(res.data.data);
        setExamName(data[0].competition.nameCompetition);
        let timeTest = (data[0].timeRound);
        setTime(Math.round(timeTest / 60));
      });
  }

  function checkExamPulic() {
    axios.get(`http://elearning-uat.tmgs.vn/api/competition/join/${roundID}/currentUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // console.log('a');
        // console.log(res.data.data);
        await setPublicExam(res.data.data);
        await setModalVisible(true);
      });
  }

  const pressByCode = () => {
    setByCode(true);
    setByAccept(false);
  };

  const pressByAccept = () => {
    setByCode(false);
    setByAccept(true);
  };
  const renderItem = ({ item }) => {
    // console.log(item.message)
    // console.log(item.id);
    setRoundID(item.id);
    setNameRound(item.nameRound);
    let status = (item.message === 'MY_COMPETITION_WAIT_CONFIRM') ? 'Đang chờ phê duyệt'
      : 'Đã thi';

    return (
      <View style={styles.contaiItem}>
        <Text style={styles.titleRoundTest}>{nameRound}</Text>
        <Text>{`Thời gian thi: ${time} phút`}</Text>
        <Text>{'Thời gian bắt đầu : Bạn được phép thi trong thời gian của cuộc thi'}</Text>
        <Text>{`Trạng thái: ${status}`}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => checkExamPulic()}>
          <Text style={{ color: '#fff' }}>Tham gia thi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function postCode() {
    axios
      .post(
        `http://elearning-uat.vnpost.vn /api/roundtest/${roundID}/inputCode/${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        //-----------------------------SHOULD CHECK(do not have code to check)-----------------------------------
        console.log(res.data.data);
      });
  }

  function postRequestAccept() {
    axios
      .post(`http://elearning-uat.tmgs.vn/api/roundtest/${roundID}/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //-----------------------------400 ERR-----------------------------------
        // console.log(res);
        // if(res)
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getListRoundTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, data]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'http://elearning-uat.tmgs.vn/static/images/default_thumb_exam.png',
        }}
        style={styles.img}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{examName}</Text>
        <FlatList
          style={styles.flatlist}
          renderItem={renderItem}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          refreshing={getting}
          onRefresh={() => getListRoundTest()}
        />
        {
          (publicExam === false) ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.title}>Bạn chưa trong bài thi, hãy đăng kí để được tham gia thi</Text>
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
                        placeholder="           Nhập mã lớp học"
                        keyboardType="numeric"
                      />
                      <TouchableOpacity
                        style={styles.requestedBtn}
                        onPress={() => {
                          postCode();
                          setModalVisible(false);
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
                          setModalVisible(false);
                        }}>
                        <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                        <View>
                          <TouchableOpacity style={styles.requestBtn} onPress={() => setVisibleText(true)}>
                            <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
                          </TouchableOpacity>
                          {
                            visibleText === true &&
                            <Text style={styles.redTxt}>Bạn cần chọn loại đăng kí trước khi nhấn 'Gửi yêu cầu'</Text>
                          }
                        </View>
                      )}
                </View>
              </View>
            </Modal>
          ) : (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.title}>Xác nhận làm bài</Text>
                    <Text>Sau khi xác nhận, thời gian sẽ bắt đầu được tính</Text>
                    <View style={styles.inline}>
                      <TouchableOpacity style={styles.btn} onPress={() => {
                        setModalVisible(false); navigation.navigate('Exam', {
                          roundID: roundID, token: token, examName: examName, nameRound: nameRound, time: time,
                        });
                      }}>
                        <Text style={{ color: '#fff' }}>Xác nhận</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn} onPress={() => { setModalVisible(false); }}>
                        <Text style={{ color: '#fff' }}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )
        }
      </View>
    </View>
  );
}

export default DetailExam;

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#ddd' },
  /**---------------Body------------------ */
  img: { width: '100%', height: 200, marginTop: 10, borderRadius: 20 },
  content: { marginHorizontal: 20, alignItems: 'center' },
  title: { fontWeight: 'bold', fontSize: scale(20) },
  titleRoundTest: { fontWeight: 'bold', fontSize: scale(16) },
  overBtn: { alignItems: 'center' },
  buttonDK: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  txtBtnDK: { color: '#fff' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(100,100,100,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  flatlist: { width: '100%', height: '60%' },
  inline: { flexDirection: 'row', marginVertical: scale(5) },
  btn: { width: scale(100), height: scale(40), backgroundColor: '#144e8c', borderRadius: scale(20), justifyContent: 'center', alignItems: 'center', marginHorizontal: scale(10), marginVertical: scale(10) },
  contaiItem: { marginHorizontal: scale(16), marginVertical: scale(10), justifyContent: 'center', alignItems: 'center', width: scale(250), paddingHorizontal: scale(20), paddingVertical: scale(10), backgroundColor: '#fff' },
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
  redTxt: { color: 'red' },
});
