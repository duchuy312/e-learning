import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';

const DoingExam = () => {
  const route = useRoute();
  const [countEx, setCountEx] = useState(0);
  const [data, setData] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [choice, setChoice] = useState([]);
  const [checked, setChecked] = useState(false);
  const [yourAnswerID, setYourAnswerID] = useState([]);
  const getExams = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/competition/contentTest/${route.params.idRound}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        },
      )
      .then((response) => {
        var arr = [];
        console.log(response.data.data.questionRT);
        setData(response.data.data.questionRT);
        if (response.data.data.questionRT === undefined) {
          setCountEx(countEx + 1);
        } else {
          for (let i = 0; i < data.length; i++) {
            arr[i] = response.data.data.questionRT[i].answers;
          }
        }
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
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countEx]);
  function addAnswer(stt, ID) {
    yourAnswerID[stt] = ID;
    console.log(yourAnswerID);
  }
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.FlatListView}>
        <Text style={styles.Text}>
          Câu {index + 1}. {item.question.question} ?
        </Text>
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
                onPress={() => addAnswer(index, answer[index][0].id)}
              />
              <Text style={styles.answerText}>
                {answer[index][0].answer}. {answer[index][0].contents}
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
                onPress={() => addAnswer(index, answer[index][1].id)}
              />
              <Text style={styles.answerText}>
                {answer[index][1].answer}. {answer[index][1].contents}
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
                onPress={() => addAnswer(index, answer[index][2].id)}
              />
              <Text style={styles.answerText}>
                {answer[index][2].answer}. {answer[index][2].contents}
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
                onPress={() => addAnswer(index, answer[index][3].id)}
              />
              <Text style={styles.answerText}>
                {answer[index][3].answer}. {answer[index][3].contents}
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
      {answer.length !== 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>Nộp Bài</Text>
      </TouchableOpacity>
    </View>
  );
};
export default DoingExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
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
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
  FlatListView: {
    marginBottom: scale(5),
    width: '98%',
  },
  answerView: {
    width: '96%',
    marginHorizontal: scale(10),
  },
  answerText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
