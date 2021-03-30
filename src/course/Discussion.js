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
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import CourseBar from '../components/CourseBar';
import {TextInput} from 'react-native-gesture-handler';
import {SendIcon, XIcon} from '../../svg/icon';
import Draggable from 'react-native-draggable';
import {Rating, AirbnbRating} from 'react-native-ratings';

const Discussion = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const route = useRoute();
  const CommenID = useState('');
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const [dataComment, setDataComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countDicuss, setCountDicuss] = useState(0);
  const [rate, setRate] = useState(null);
  const sendRate = async () => {
    await axios
      .post(
        'https://elearning.tmgs.vn/api/course/rating',
        {
          valuess: rate,
          courseId: route.params.CourseID,
        },
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const sendComment = async () => {
    await axios
      .post(
        'https://elearning.tmgs.vn/api/comment/course',
        {
          courseId: route.params.CourseID,
          contents: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        ClearInput();
      })
      .catch(function (error) {
        // handle error
        setModalVisible2(true);
        console.log(error);
      })
      .finally(() => {
        setCountDicuss(countDicuss + 1);
      });
  };
  const getComment = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/comment/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        setDataComment(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log(dataComment);
      });
  };
  useEffect(() => {
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDicuss]);
  const ClearInput = () => {
    setComment('');
  };
  function ratingCompleted(rating) {
    setRate(rating);
  }
  const renderItem = ({item}) => {
    return (
      <View style={styles.CommentContainer}>
        <View style={styles.AvatarUserContainer}>
          <View style={styles.circle}>
            <Image
              style={styles.AvatarUser}
              source={{
                uri: 'http://elearning-uat.tmgs.vn' + item.urlImage,
              }}
            />
          </View>
        </View>
        <View style={styles.CommentData}>
          <Text style={styles.NameUser}>{item.createdBy}</Text>
          <Text style={styles.commentText}>{item.contents}</Text>
          <Text style={styles.timeText}>
            {new Date(item.createdDate)
              .toLocaleString('en-GB')
              .replace(', ', ' at ')}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <View style={styles.inputArea}>
          <TextInput
            value={comment}
            style={styles.InputText}
            placeholder={'Bình Luận....'}
            onChangeText={(input) => setComment(input)}
          />
        </View>
        <TouchableOpacity
          style={styles.SendButton}
          onPress={() => sendComment()}>
          <SendIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataComment}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={CommenID}
      />
      <Draggable
        imageSource={require('../../img/star.png')}
        renderSize={scale(60)}
        x={scale(270)}
        y={scale(420)}
        shouldReverse={true}
        onPressOut={() => setModalVisible(true)}
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
            <Text style={styles.modalText}>Đánh giá khóa học</Text>
            <AirbnbRating
              count={5}
              defaultRating={0}
              size={scale(40)}
              onFinishRating={ratingCompleted}
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                sendRate();
              }}>
              <View style={styles.blueButton}>
                <Text style={styles.rateText}>Đánh Giá</Text>
              </View>
            </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.smallCenteredView}
          onPress={() => {
            setModalVisible2(false);
          }}>
          <View style={styles.smallModalView}>
            <View style={styles.modalCenter}>
              <View style={styles.circleX}>
                <XIcon />
              </View>
              <Text style={styles.smallModalText}>
                Bạn chưa đăng ký khóa học !
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  CommentContainer: {
    width: '100%',
    height: scale(100),
    borderBottomWidth: scale(1 / 2),
    flexDirection: 'row',
  },
  AvatarUserContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CommentData: {
    width: '70%',
    height: '100%',
    paddingTop: scale(5),
  },
  circle: {
    height: scale(80),
    width: scale(80),
    overflow: 'hidden',
    borderRadius: scale(40),
  },
  AvatarUser: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  commentText: {
    fontSize: scale(14),
  },
  NameUser: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  timeText: {
    color: '#cecece',
  },
  InputContainer: {
    width: '100%',
    height: scale(60),
    borderBottomWidth: scale(1 / 2),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputArea: {
    width: '80%',
    height: scale(50),
    justifyContent: 'center',
  },
  InputText: {
    fontSize: scale(14),
  },
  SendButton: {
    height: scale(44),
    width: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: scale(250),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(10),
  },
  blueButton: {
    width: scale(80),
    height: scale(30),
    borderRadius: scale(2),
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#209cf4',
  },
  rateText: {
    fontSize: scale(16),
    color: 'white',
  },
  modalText: {
    color: '#ff5900',
    fontSize: scale(20),
    textAlign: 'center',
    marginBottom: scale(10),
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
