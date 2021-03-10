import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {
  BuildingIcon,
  CalendarIcon,
  FlagTickIcon,
  ClockIcon,
  CircleCheckIcon,
} from '../../svg/icon';
import {TextInput} from 'react-native-gesture-handler';

const ExamDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ExamID, setExamID] = useState('');
  const [dataExam, setDataExam] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [getting, setGetting] = useState(false);
  const [sendID, setSendID] = useState('');
  const [code, setCode] = useState('');
  // /api/roundtest/{id_round}/
  const JoinWithCode = async (id) => {
    await axios
      .post(
        `http://elearning-uat.tmgs.vn/api/roundtest/${id}/inputCode/${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${route.params.examTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  };
  const sendRequest = async (id) => {
    await axios
      .post(
        `http://elearning-uat.tmgs.vn/api/roundtest/${id}/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${route.params.examTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  };
  const getExams = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/competition/${route.params.idExam}/roundTest/list`,
        {
          headers: {
            Authorization: `Bearer ${route.params.examTK}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response);
        console.log(response.data.data);
        setDataExam(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setGetting(false);
      });
  };
  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={styles.itemExam}>
        <View style={styles.smallImageContainer}>
          <Image
            style={styles.smallImage}
            source={{
              uri:
                'http://elearning-uat.tmgs.vn/static/images/default_thumb_exam.png',
            }}
          />
        </View>
        <View style={styles.viewExam}>
          <Text style={styles.text}>{item.nameRound}</Text>
          <Text style={styles.content}>
            <CalendarIcon /> Thời gian bắt đầu : Bạn được phép thi trong thời
            gian của cuộc thi
          </Text>
          {item.message === 'MY_COMPETITION_NOT_JOIN' ? (
            <Text style={styles.content}>
              <FlagTickIcon /> Trạng thái : Chưa tham gia
            </Text>
          ) : null}
          {item.message === 'MY_COMPETITION_DONE' ? (
            <Text style={styles.greentext}>
              <FlagTickIcon /> Trạng thái : Đã Thi
            </Text>
          ) : null}
          {item.message === 'MY_COMPETITION_NOT_DONE' ? (
            <Text style={styles.content}>
              <FlagTickIcon /> Trạng thái : Chưa thi
            </Text>
          ) : null}
          {item.message === 'MY_COMPETITION_WAIT_CONFIRM' ? (
            <Text style={styles.content}>
              <FlagTickIcon /> Trạng thái : Chờ Duyệt
            </Text>
          ) : null}
          <Text style={styles.content}>
            <ClockIcon clockheight={scale(15)} clockwidth={scale(14)} /> Thời
            gian làm bài : {item.timeRound / 60} Phút
          </Text>
          <View style={styles.lineView} />
          {item.message === 'MY_COMPETITION_DONE' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('ExamResult', {
                  token: route.params.examTK,
                  name: item.nameRound,
                  namePS: route.params.examPS,
                  timeExam: item.timeRound / 60,
                  doAgain: item.maxWork,
                  idRound: item.id,
                })
              }>
              <Text style={styles.text}>Xem kết quả thi</Text>
            </TouchableOpacity>
          ) : null}
          {item.message === 'MY_COMPETITION_NOT_JOIN' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(true);
                setSendID(item.id);
              }}>
              <Text style={styles.text}>Tham Gia Thi</Text>
            </TouchableOpacity>
          ) : null}
          {item.message === 'MY_COMPETITION_NOT_DONE' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('DoingExam', {
                  idRound: item.id,
                  token: route.params.examTK,
                  timeRound: item.timeRound / 60,
                })
              }>
              <Text style={styles.text}>Vào thi</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'Exam'} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.tmgs.vn/static/images/default_thumb_exam.png',
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>{route.params.examName}</Text>
        </View>
        <View style={styles.iconAndTextTop}>
          <Text style={styles.authorText}>Đơn vị tạo cuộc thi: </Text>
          <BuildingIcon color="#17a2b8" />
          <Text style={styles.text}>{route.params.examPS}</Text>
        </View>
      </View>
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataExam}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={getting}
        onRefresh={() => getExams()}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn chưa có trong danh sách thí sinh !
            </Text>
            <View style={styles.viewInsideModal}>
              <Text style={styles.modalTextInside}>Nhập mã vòng thi</Text>
              <TextInput
                fontSize={16}
                value={code}
                onChangeText={(input) => setCode(input)}
                style={styles.TextInputView}
                placeholder={'Mã Vòng Thi'}
              />
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  JoinWithCode(sendID);
                  setModalVisible(!modalVisible);
                }}>
                <Text>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconAndText}>
              <Text>Bạn không có mã vòng thi ? </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(true);
                  sendRequest(sendID);
                }}>
                <Text style={styles.linkText}>Gửi yêu cầu đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.smallCenteredView}>
          <View style={styles.smallModalView}>
            <CircleCheckIcon />
            <Text style={styles.smallModalText}>
              Xin chờ quản trị viên phê duyệt
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible2(!modalVisible2);
                setModalVisible(false);
              }}>
              <View style={styles.blueButton}>
                <Text style={{color: 'white'}}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ExamDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  logocontainer: {
    height: scale(200),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
    marginBottom: scale(10),
    borderWidth: scale(2),
    borderColor: 'black',
  },
  contentContainer: {
    marginLeft: scale(8),
    marginRight: scale(8),
    alignItems: 'center',
    backgroundColor: 'white',
    height: scale(90),
  },
  titleContainer: {
    width: '98%',
    backgroundColor: '#fffce1',
  },
  textTitle: {
    fontSize: scale(25),
    textAlign: 'center',
  },
  text: {
    marginLeft: scale(5),
    fontSize: scale(14),
  },
  content: {
    fontWeight: '400',
    fontSize: scale(12),
    marginLeft: scale(5),
  },
  greentext: {
    color: 'green',
    fontWeight: '400',
    fontSize: scale(12),
    marginLeft: scale(5),
  },
  newData: {
    flex: 1,
    backgroundColor: 'gray',
  },
  imageContainer: {
    width: '100%',
    height: '35%',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconAndTextTop: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    color: '#f6821f',
    fontSize: scale(14),
  },
  smallImageContainer: {
    width: scale(100),
    height: scale(100),
    alignSelf: 'center',
    backgroundColor: 'gray',
    marginLeft: scale(8),
    borderRadius: scale(5),
  },
  viewExam: {
    height: scale(90),
    width: scale(210),
    marginLeft: scale(5),
    marginRight: scale(10),
    marginTop: scale(10),
  },
  itemExam: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: scale(8),
    borderRadius: scale(10),
    marginVertical: scale(8),
    height: scale(150),
    width: '96%',
    elevation: scale(2),
    overflow: 'hidden',
  },
  smallImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: scale(10),
  },
  lineView: {
    marginTop: scale(5),
    height: scale(1),
    width: scale(210),
    backgroundColor: 'blue',
  },
  button: {
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#ffc107',
    height: scale(35),
    width: scale(110),
    borderRadius: scale(5),
    alignSelf: 'center',
    marginVertical: scale(5),
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.5)',
  },
  modalView: {
    height: scale(220),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(10),
  },
  smallModalView: {
    height: scale(180),
    width: scale(200),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(8),
  },
  viewInsideModal: {
    backgroundColor: '#e7ebee',
    width: '96%',
    height: scale(110),
    alignItems: 'center',
    borderRadius: scale(10),
    justifyContent: 'space-around',
  },
  TextInputView: {
    backgroundColor: 'white',
    height: scale(40),
    width: scale(200),
    borderRadius: scale(10),
  },
  modalText: {
    color: '#ff5900',
    fontSize: scale(20),
    textAlign: 'center',
    marginBottom: scale(10),
  },
  modalTextInside: {
    color: '#4C70AE',
    fontSize: scale(14),
  },
  openButton: {
    width: scale(60),
    height: scale(30),
    borderRadius: scale(10),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  blueButton: {
    width: scale(40),
    height: scale(20),
    borderRadius: scale(4),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#209cf4',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
  },
});
