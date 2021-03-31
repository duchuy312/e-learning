import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  LogBox,
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {WarnIcon} from '../../svg/icon';

LogBox.ignoreAllLogs();
const WareCourse = () => {
  const navigation = useNavigation();
  const [dataWare, setDataWare] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [wareDetail, setWareDetail] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const WareID = useState('');
  const route = useRoute('');
  const [count, setCount] = useState(0);
  const [countDone, setCountDone] = useState(false);
  const [idRound, setIdRound] = useState(null);
  const [dataRound, setDataRound] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const getWare = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/course-ware/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        const Detail = [];
        for (var i = 0; i < response.data.data.length; i++) {
          Detail[i] = response.data.data[i].chapterCourseWares;
        }
        setWareDetail(Detail);
        setDataWare(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setCount(count + 1);
      });
    await CheckWare();
    await getRoom();
  };
  const CheckTest = async () => {
    await axios
      .get(`https://elearning.tmgs.vn/api/roundtest/${idRound}`, {
        headers: {
          Authorization: `Bearer ${route.params.CourseTK}`,
        },
      })
      .then((response) => {
        setDataRound(response.data.data);
      })
      .then(() => setModalVisible2(true))
      .catch((error) => {
        console.log(error);
      });
  };
  const getRoom = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/chatroom/all/user?id=${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        setDataRoom(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const CheckWare = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/v2/course/final/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data.data);
        setIdRound(response.data.data.statusExamDTO.idRound);
        let x = 0;
        for (let i = 0; i < response.data.data.chapterDTOs.length; i++) {
          if (response.data.data.chapterDTOs[i].status === 1) {
            dataDone[i] = 1;
            x = x + 1;
          }
        }
        if (x === response.data.data.chapterDTOs.length) {
          setCountDone(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SendWareProcess = async (courseWareId, chapterId) => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/course-ware-process/${courseWareId}/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  var ArrView = [];
  var ArrViewWithKey = [];
  for (let i = 0; i < wareDetail.length; i++) {
    for (let j = 0; j < wareDetail[i].length; j++) {
      ArrView.push(
        <View key={i}>
          <TouchableOpacity
            onPress={() => {
              SendWareProcess(
                wareDetail[i][j].courseWareId,
                wareDetail[i][j].chapterId,
              );
              navigation.navigate('VideoPlayer', {
                urlFile: wareDetail[i][j].courseWare.files,
                name: wareDetail[i][j].courseWare.name,
                content: wareDetail[i][j].courseWare.content,
              });
            }}>
            <Text style={styles.linkText}>
              {wareDetail[i][j].courseWare.name}
            </Text>
          </TouchableOpacity>
        </View>,
      );
    }
  }
  for (let i = 0; i < wareDetail.length; i++) {
    ArrViewWithKey[i] = ArrView.filter((dataView) => {
      return dataView.key === `${i}`;
    });
  }
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.WareContainer}>
        <Text style={styles.title}>
          {item.name}, {item.id}
        </Text>
        {wareDetail[index] === undefined ? (
          <Text>Chưa có học liệu cho chương mục này !</Text>
        ) : (
          <View>{ArrViewWithKey[index]}</View>
        )}
        <Text>
          {dataDone[index] === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'https://elearning.tmgs.vn/static/images/default_thumb_course.png',
          }}
        />
      </View>
      <FlatList
        data={dataWare}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={WareID}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ChatRoom', {
            idRoom: dataRoom[0].id,
            nameRoom: dataRoom[0].name,
            token: route.params.CourseTK,
          });
        }}>
        <Text style={styles.buttontext}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          countDone ? CheckTest() : setModalVisible(true);
        }}>
        <Text style={styles.buttontext}>Thi cuối khóa</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.smallCenteredView}>
          <View style={styles.smallModalView}>
            <Text style={styles.smallModalText}>Xác nhận làm bài thi</Text>
            <View style={styles.twoButon}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}>
                <View style={styles.redButton}>
                  <Text style={{color: 'white'}}>Hủy</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DoingExam', {
                    idRound: idRound,
                    token: route.params.CourseTK,
                    timeRound: dataRound.timeRound,
                    name: dataRound.nameRound,
                    idCourse: route.params.CourseID,
                  });
                }}>
                <View style={styles.blueButton}>
                  <Text style={{color: 'white'}}>Vào thi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              <WarnIcon />
              <Text style={styles.smallModalText}>
                Bạn chưa hoàn thành khóa học !
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default WareCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  logocontainer: {
    height: scale(200),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(1 / 4),
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
  },
  WareContainer: {
    width: '100%',
    borderBottomWidth: scale(1 / 2),
    padding: scale(10),
  },
  title: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
  },
  button: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: scale(5),
    marginBottom: scale(10),
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
  blueButton: {
    width: scale(50),
    height: scale(25),
    borderRadius: scale(4),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#209cf4',
  },
  redButton: {
    width: scale(50),
    height: scale(25),
    borderRadius: scale(4),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff2f2f',
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
    height: scale(120),
    width: scale(200),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(8),
  },
  twoButon: {
    flexDirection: 'row',
    marginTop: scale(10),
    width: '80%',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  modalCenter: {
    alignItems: 'center',
  },
  smallModalText: {
    marginTop: scale(10),
    color: 'black',
    fontSize: scale(12),
    textAlign: 'center',
  },
});
