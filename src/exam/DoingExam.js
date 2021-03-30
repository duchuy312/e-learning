/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import {TimeIcon, CheckIcon} from '../../svg/icon';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import {enableScreens} from 'react-native-screens';

enableScreens();
const DoingExam = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [countEx, setCountEx] = useState(0);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [choice, setChoice] = useState('');
  const [dataSubmit, setDataSubmit] = useState([]);
  const [yourAnswer, setYourAnswer] = useState([]);
  const [yourAnswerID] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const submitWithFetch = async (body) => {
    console.log(JSON.stringify(body));
    axios({
      method: 'post',
      url: `https://elearning.tmgs.vn/api/roundtest/submit/${route.params.idRound}`,
      data: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${route.params.examTK}`,
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };
  const submitAnswer = async (body) => {
    var arr = JSON.stringify(body);
    console.log(body);
    await axios
      .post(
        `https://elearning.tmgs.vn/api/roundtest/submit/${route.params.idRound}`,
        body,
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
        navigation.navigate('ExamDetail');
        setModalVisible1(false);
      });
  };
  const getExams = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/competition/contentTest/${route.params.idRound}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        },
      )
      .then((response) => {
        var arr = [];
        var submitArr = [
          {
            idQuestion: '',
            answerChecked: [],
            answerNotChecked: [],
            typeQuestion: '',
          },
        ];
        console.log(response.data.data.questionRT);
        setData(response.data.data.questionRT);
        if (response.data.data.questionRT === undefined) {
          setCountEx(countEx + 1);
        } else {
          for (let i = 0; i < data.length; i++) {
            console.log(response.data.data.questionRT[i].answers.length);
            arr[i] = response.data.data.questionRT[i].answers;
            if (response.data.data.questionRT[i].answers.length === 2) {
              submitArr[i] = {
                idQuestion: response.data.data.questionRT[i].question.id,
                answerChecked: [''],
                answerNotChecked: ['A', 'B'],
                typeQuestion: response.data.data.questionRT[i].typeQuestion,
              };
            } else if (response.data.data.questionRT[i].answers.length === 3) {
              submitArr[i] = {
                idQuestion: response.data.data.questionRT[i].question.id,
                answerChecked: [''],
                answerNotChecked: ['A', 'B', 'C'],
                typeQuestion: response.data.data.questionRT[i].typeQuestion,
              };
            } else if (response.data.data.questionRT[i].answers.length === 4) {
              submitArr[i] = {
                idQuestion: response.data.data.questionRT[i].question.id,
                answerChecked: [''],
                answerNotChecked: ['A', 'B', 'C', 'D'],
                typeQuestion: response.data.data.questionRT[i].typeQuestion,
              };
            }
          }
        }
        setDataSubmit(submitArr);
        setAnswer(arr);
      })
      .catch(function (error) {
        // handle error
        setCountEx(countEx + 1);
        console.log(error);
      })
      .finally(() => {
        answer.length === 0 ? setCountEx(countEx + 1) : null;
        console.log(answer);
      });
  };
  useEffect(() => {
    answer.length === 0 ? getExams() : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countEx]);
  function addAnswer(stt, ID, answer) {
    var index = dataSubmit[stt].answerNotChecked.indexOf(answer);
    yourAnswerID[stt] = ID;
    yourAnswer[stt] = answer;
    dataSubmit[stt].answerChecked = [answer];
    setChoice(ID);
    console.log(yourAnswer);
  }
  const contentWidth = (useWindowDimensions().width * 90) / 100;
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.FlatListView}>
        <Text style={styles.Text}>Câu {index + 1}.</Text>
        <View style={styles.QuestionView}>
          <HTML
            defaultTextProps={styles.QuestionText}
            mediaPlaybackRequiresUserAction={true}
            source={{
              html: item.question.question.replace(
                /src="/g,
                'src="http://elearning.tmgs.vn',
              ),
            }}
            contentWidth={contentWidth}
            baseFontStyle={styles.QuestionText}
          />
        </View>
        {item.question.url !== null && item.question.url !== '' ? (
          <View style={styles.imageContainer}>
            <WebView
              source={{
                uri: 'http://elearning.tmgs.vn' + item.question.url,
              }}
            />
          </View>
        ) : null}
        <View style={styles.answerView}>
          {answer[index].length > 0 ? (
            <View style={styles.ButtonAndText}>
              <RadioButton
                uncheckedColor="#144E8C"
                color="#144E8C"
                value="A"
                status={
                  answer[index][0].id === yourAnswerID[index]
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  addAnswer(index, answer[index][0].id, answer[index][0].answer)
                }
              />
              <Text style={styles.answerText}>
                A. {answer[index][0].contents}
              </Text>
            </View>
          ) : null}
          {answer[index].length > 1 ? (
            <View style={styles.ButtonAndText}>
              <RadioButton
                uncheckedColor="#144E8C"
                color="#144E8C"
                value="B"
                status={
                  answer[index][1].id === yourAnswerID[index]
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  addAnswer(index, answer[index][1].id, answer[index][1].answer)
                }
              />
              <Text style={styles.answerText}>
                B. {answer[index][1].contents}
              </Text>
            </View>
          ) : null}
          {answer[index].length > 2 ? (
            <View style={styles.ButtonAndText}>
              <RadioButton
                uncheckedColor="#144E8C"
                color="#144E8C"
                value="C"
                status={
                  answer[index][2].id === yourAnswerID[index]
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  addAnswer(index, answer[index][2].id, answer[index][2].answer)
                }
              />
              <Text style={styles.answerText}>
                C. {answer[index][2].contents}
              </Text>
            </View>
          ) : null}
          {answer[index].length > 3 ? (
            <View style={styles.ButtonAndText}>
              <RadioButton
                uncheckedColor="#144E8C"
                color="#144E8C"
                value="D"
                status={
                  answer[index][3].id === yourAnswerID[index]
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() =>
                  addAnswer(index, answer[index][3].id, answer[index][3].answer)
                }
              />
              <Text style={styles.answerText}>
                D. {answer[index][3].contents}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'Trở lại'} />
      <View style={styles.time}>
        <View style={styles.iconAndText}>
          <TimeIcon />
          <CountDown
            size={scale(18)}
            until={route.params.timeRound}
            onFinish={() => {
              setModalVisible(true);
              submitAnswer(dataSubmit);
            }}
            digitStyle={{
              backgroundColor: '#FFF',
            }}
            digitTxtStyle={{color: '#000000'}}
            timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
            separatorStyle={{color: '#000000'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
          />
        </View>
      </View>
      {answer.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Loading....</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible1(true);
        }}>
        <Text style={styles.buttontext}>Nộp Bài</Text>
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
            navigation.navigate('ExamDetail');
            setModalVisible(false);
          }}>
          <View style={styles.smallModalView}>
            <View style={styles.modalCenter}>
              <CheckIcon />

              <Text style={styles.smallModalText}>
                Đã hết giờ làm bài, hệ thống sẽ tự động nộp bài
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
        <TouchableOpacity style={styles.smallCenteredView}>
          <View style={styles.smallModalView}>
            <View style={styles.modalCenter}>
              <CheckIcon />

              <Text style={styles.smallModalText}>Bạn muốn nộp bài ?</Text>
              <View style={styles.submitButon}>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible1(false);
                  }}>
                  <Text>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    submitWithFetch(dataSubmit);
                  }}>
                  <Text>Nộp Bài</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default DoingExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  Text: {
    color: 'black',
    marginLeft: scale(10),
    fontSize: scale(18),
    fontWeight: '400',
  },
  ButtonAndText: {
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
    elevation: scale(5),
    marginBottom: scale(10),
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
  FlatListView: {
    marginBottom: scale(5),
    width: '100%',
    flex: 1,
  },
  answerView: {
    width: '96%',
    marginHorizontal: scale(10),
  },
  answerText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  time: {
    backgroundColor: 'white',
    width: '100%',
    height: scale(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconAndText: {
    marginLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeCountdown: {
    fontSize: scale(20),
    marginLeft: scale(5),
  },
  QuestionText: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginLeft: scale(10),
    fontWeight: '400',
  },
  QuestionView: {
    marginLeft: scale(10),
  },
  imageContainer: {
    width: '98%',
    height: scale(180),
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
  submitButon: {
    flexDirection: 'row',
    marginTop: scale(10),
    width: '80%',
    justifyContent: 'space-around',
    alignSelf: 'center',
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
});
