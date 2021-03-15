/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
const Exam = ({navigation, route}) => {
  const {roundID, token, examName, nameRound, time} = route.params;
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  //check user register by code or by accept
  const [byCode, setByCode] = useState(false);
  const [byAccept, setByAccept] = useState(false);

  function getQuestion() {
    axios
      .get(
        `http://elearning-uat.tmgs.vn/api/competition/contentTest/${roundID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setData(res.data.data.questionRT);
        console.log(data);
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  //------------------------------handle radio button---------------------------------
  const pressByCode = () => {
    setByCode(true);
    setByAccept(false);
  };

  const pressByAccept = () => {
    setByCode(false);
    setByAccept(true);
  };

  function renderItem({item}) {
    setSelectedId(item.id);
    return (
      <View>
        <Text
          style={
            styles.titleQues
          }>{`Câu ${item.index}: ${item.question.question}`}</Text>
        {item.answers.map((element, index) => (
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.inline}>
              <TouchableOpacity
                style={styles.bigCircle}
                onPress={() => pressByCode()}>
                {byCode === true && <View style={styles.smallCircle} />}
              </TouchableOpacity>
              <Text style={styles.text}>{element.answer}.</Text>
              <Text style={styles.text}>{element.contents}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.contaiTitle}>
        <Text style={styles.title}>{`${nameRound}: ${examName}`}</Text>
      </View>
      <Text style={styles.timeText}>{`Thời gian thi: ${time} phút`}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      <View style={styles.contaiTitle}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{'Nộp bài'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Exam;

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: scale(15), marginVertical: scale(10)},
  contaiTitle: {alignItems: 'center'},
  title: {fontSize: scale(25), fontWeight: 'bold'},
  timeText: {fontSize: scale(15), textDecorationLine: 'underline'},
  titleQues: {fontSize: scale(20), color: '#144e8c', marginTop: scale(10)},
  inline: {flexDirection: 'row'},
  text: {fontSize: scale(15)},
  button: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
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
});
