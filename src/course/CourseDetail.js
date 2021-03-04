import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {StarIcon} from '../../svg/icon';
import CourseBar from '../components/CourseBar';
import {CircleCheckIcon} from '../../svg/icon';

const CourseDetail = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [dataCourse, setDataCourse] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const route = useRoute();
  const [count, setCount] = useState(0);
  const [register, setRegister] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [code, setCode] = useState('');
  const JoinWithCode = async () => {
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/course/request-code',
        {
          courseId: route.params.CourseID,
          courseCode: code,
        },
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
  const sendRequest = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/course/request/${route.params.CourseID}`,
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
  const requestOne = axios.get(
    `http://elearning-uat.vnpost.vn/api/course/${route.params.CourseID}`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const requestTwo = axios.get(
    `http://elearning-uat.vnpost.vn/api/v2/course/rating/${route.params.CourseID}`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const requestThree = axios.get(
    `http://elearning-uat.vnpost.vn/api/course/courseJoin/${route.params.CourseID}/currentUser`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const getCourse = async () => {
    await axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((response, response1, response2) => {
          setDataCourse(response.data.data);
          setDataRate(response1.data.data);
          setRegister(response2.data.data);
        }),
      )
      .then(() => {
        if (dataCourse.length === 0) {
          setCount(count + 1);
        } else {
          setLoading(true);
          console.log(dataCourse);
        }
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      });
  };
  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.scrollArea}>
          <Image
            style={styles.imageNew}
            source={{
              uri:
                'http://elearning-uat.vnpost.vn/static/images/default_thumb_course.png',
            }}
          />
          {loading ? (
            <View>
              <View style={styles.bar}>
                <View>
                  <Text style={styles.textTitle}>Người tạo: </Text>
                  <Text>{dataCourse.createdBy}</Text>
                </View>
                <View style={styles.line} />
                <View>
                  <Text style={styles.textTitle}>Đánh Giá: </Text>
                  <View style={styles.iconAndText}>
                    <Text>{dataRate.avarageRate}/5 </Text>
                    <StarIcon color={'#007bff'} />
                  </View>
                </View>
                <View style={styles.line} />
                <View>
                  <Text style={styles.textTitle}>Danh mục: </Text>
                  <Text>{dataCourse.coursecategory.name}</Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.TopContent}>
                  <Text style={styles.titleNew}>{dataCourse.name}</Text>
                  <View style={styles.iconAndText}>
                    <StarIcon
                      color={dataRate.avarageRate > 0 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 0 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 1 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 1 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 2 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 2 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 3 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 3 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 4 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 4 ? '#FCB71E' : '#f4ebdf'}
                    />
                  </View>
                  <View style={styles.time}>
                    <Text>
                      Bắt đầu:{' '}
                      {new Date(
                        dataCourse.courseConfig.start,
                      ).toLocaleDateString('en-GB')}
                    </Text>
                    <Text>
                      Kết thúc:{' '}
                      {new Date(
                        dataCourse.courseConfig.start,
                      ).toLocaleDateString('en-GB')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.contentText}>{dataCourse.description}</Text>
                {register ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('WareCourse', {
                        CourseID: route.params.CourseID,
                        CourseTK: route.params.CourseTK,
                      })
                    }>
                    <Text style={styles.buttontext}>Vào học</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttontext}>Đăng ký học</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
          <View style={styles.whiteSpace} />
        </View>
      </ScrollView>
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
              Bạn chưa có trong danh sách học viên !
            </Text>
            <View style={styles.viewInsideModal}>
              <Text style={styles.modalTextInside}>Nhập mã khóa học</Text>
              <TextInput
                fontSize={16}
                value={code}
                onChangeText={(input) => setCode(input)}
                style={styles.TextInputView}
                placeholder={'Mã Vòng Khóa Học'}
              />
              <TouchableOpacity
                style={styles.openButton}
                onPress={() => {
                  JoinWithCode();
                  setModalVisible(!modalVisible);
                }}>
                <Text>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconAndText}>
              <Text>Bạn không có mã khóa học ? </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(true);
                  sendRequest();
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
export default CourseDetail;

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
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
  },
  scrollcontent: {
    alignContent: 'center',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(290),
    width: '90%',
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  text: {
    fontSize: scale(14),
    lineHeight: scale(20),
  },
  content: {
    fontWeight: '400',
    fontSize: scale(14),
  },
  newData: {
    flex: 1,
    backgroundColor: 'gray',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#f6821f',
    textAlign: 'center',
  },
  line: {
    height: '80%',
    width: scale(1 / 2),
    backgroundColor: 'black',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: scale(50),
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(250),
  },
  contentText: {
    fontSize: scale(16),
  },
  ScrollContainer: {
    width: '100%',
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    alignContent: 'center',
    height: '300%',
  },
  whiteSpace: {
    height: scale(450),
  },
  TopContent: {
    alignItems: 'center',
    height: scale(100),
    justifyContent: 'space-between',
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
