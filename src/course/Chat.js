import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import axiosRetry from 'axios-retry';
import axios from 'axios';
import {scale} from 'react-native-size-matters';
import {Rating, AirbnbRating} from 'react-native-ratings';

const Chat = ({route}) => {
  const [data, setData] = useState([]);
  const [valueComment, setValueComment] = useState('');
  const [loading, setLoading] = useState(0);
  const [date, setDate] = useState('');
  const [valueStar, setValueStar] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const {courseID, token} = route.params;
  axiosRetry(axios, {retries: 15});
  function postComment() {
    axios
      .post(
        'http://elearning-uat.vnpost.vn/api/comment/course',
        {
          courseId: courseID,
          contents: valueComment,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then((res) => {
        //console.log(res);
        setLoading(loading + 1);
      });
  }

  function postCourseEvaluate() {
    axios
      .post(
        'http://elearning-uat.vnpost.vn/api/course/rating',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
        {
          body: {valuess: valueStar, courseId: courseID},
        },
      )
      .then((res) => {})
      .catch((err) => {
        console.log('chat', err);
      });
  }

  function getComment() {
    axios
      .get(`http://elearning-uat.vnpost.vn/api/comment/course/${courseID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        //console.log(res);
        //console.log(res.data.data);
        setData(res.data.data);
        //console.log(linkImg);
      })
      .catch(function (err) {
        // handle error
        setLoading(loading + 1);
        //console.log(error);
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loading]);

  function getDate(createdDate) {
    let date = new Date(createdDate);
    setDate(date.toLocaleDateString('en-US').split('/').join('/'));
  }

  const renderItem = ({item}) => {
    // console.log(item.urlImage);
    getDate(item.createdDate);
    return (
      <View>
        <View style={styles.viewInput}>
          <View style={styles.viewAvata}>
            <Image
              source={{uri: `http://elearning-uat.vnpost.vn${item.urlImage}`}}
              style={styles.imgAva}
            />
          </View>
          <View style={styles.contaiText}>
            <Text style={styles.createBy}>{item.createdBy}</Text>
            <Text>{item.contents}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <View style={styles.viewAvata}>
          <Text style={styles.txtAva}>A</Text>
        </View>
        <View style={styles.contaiTextInput}>
          <TextInput
            multiline
            style={styles.textInput}
            onChangeText={setValueComment}
            value={valueComment}
          />
          <TouchableOpacity
            style={styles.send}
            onPress={() => {
              setValueComment('');
              postComment();
            }}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        //console.log(data)
      }
      {data[0] === null ? (
        <View style={styles.contaiNonComment}>
          <Text style={styles.txtNonComment}>{'Chưa có đánh giá nào'}</Text>
        </View>
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity
        style={styles.btnSendStar}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.whiteText}>Đánh giá bằng sao</Text>
      </TouchableOpacity>
      {
        //--------------------------MODAL---------------------------
      }
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Đánh giá khóa học</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              showRating
              onFinishRating={(num) => {
                setValueStar(num);
              }}
            />
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => {
                setModalVisible(false);
                postCourseEvaluate();
              }}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', alignItems: 'center'},
  title: {alignItems: 'center'},
  viewInput: {
    width: '100%',
    height: scale(70),
    flexDirection: 'row',
  },
  viewAvata: {
    width: scale(65),
    height: scale(65),
    borderRadius: scale(35),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgAva: {width: scale(65), height: scale(65), borderRadius: scale(35)},
  txtAva: {fontSize: scale(30)},
  contaiTextInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: scale(1),
    borderColor: '#ddd',
    width: scale(230),
    borderRadius: scale(20),
  },
  btnSendStar: {
    width: scale(260),
    height: scale(50),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(25),
    marginVertical: scale(10),
  },
  whiteText: {color: 'white'},
  contaiText: {
    width: scale(250),
    height: scale(70),
    marginHorizontal: scale(5),
    justifyContent: 'center',
  },
  createBy: {fontWeight: 'bold'},
  line: {
    width: '100%',
    height: scale(1),
    backgroundColor: '#ddd',
    marginVertical: scale(5),
  },
  date: {color: '#aaa', fontSize: scale(12), marginVertical: scale(8)},
  send: {
    width: scale(45),
    height: scale(50),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    marginLeft: scale(5),
  },
  contaiNonComment: {
    height: scale(50),
    width: '100%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNonComment: {color: 'red'},
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
  btnSend: {
    width: scale(100),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    marginVertical: scale(10),
  },
  sendText: {color: '#fff'},
  modalText: {fontWeight: 'bold', fontSize: scale(16)},
});

export default Chat;
