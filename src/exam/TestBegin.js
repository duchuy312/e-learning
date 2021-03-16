import React, {useState, useEffect} from 'react';
import {RadioButton} from 'react-native-paper';
import Backbar from '../components/BackBar';
import CountDown from 'react-native-countdown-component';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
// import {Checkbox} from 'react-native-paper';
// import CheckBox from '@react-native-community/checkbox';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
} from 'react-native';
export default function TestBegin({route}) {
  const {timeRoundB, tokenB, idRoundB} = route.params;
  const [data, setData] = useState([]);
  const [dataSubmit, setDataSubmit] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [answer, setAnswer] = useState([]);
  const getExamsQuestion = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/competition/contentTest/${idRoundB}
        `,
        {
          headers: {
            Authorization: `Bearer ${tokenB}`,
          },
        },
      )
      .then((response) => {
        console.log('getExamsQuestion', response.data.data.questionRT);
        setData(response.data.data.questionRT);
        // setAnswer(response.data.data.questionRT.answers);
        // console.log('answer', answer);
      })
      .catch(function (error) {
        // setCount(count + 1);
        console.log(error);
      })
      .finally(() => {
        //console.log('finally');
      });
  };
  useEffect(() => {
    if (tokenB.length > 0) {
      getExamsQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenB]);
  // console.log('dataQuestion', answer);
  const submitAnswer = async () => {
    await axios
      .post(
        `http://elearning-uat.tmgs.vn/api/roundtest/submit/${idRoundB}`,
        dataSubmit,
        {
          headers: {
            Authorization: `Bearer ${tokenB}`,
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
        console.log(dataSubmit);
      });
  };
  const findHtml = (value) => {
    if (value == null) {
      return;
    }
    var res = value.replace(
      'src="/',
      'src="' + 'http://elearning-uat.tmgs.vn/',
    );

    // console.log(res);
    return res;
  };
  const answerShow = (arrAnswer) => {
    for (var i = 0; i < arrAnswer.length; i++) {
      var arr = arrAnswer[i];
    }
    return arr;
  };
  // eslint-disable-next-line no-undef
  const contentWidth = (useWindowDimensions().width * 90) / 100;
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewQuestion}>
        <Text style={styles.textQuestion}>Câu hỏi số {item.index} </Text>
        <View style={{marginLeft: 15}}>
          <HTML
            defaultTextProps={styles.textQuestion}
            source={{html: findHtml(item.question.question)}}
            contentWidth={contentWidth}
            baseFontStyle={styles.textQuestion}
          />
          {/* <WebView
            style={{width: 300, height: 300, backgroundColor: 'red'}}
            source={{
              html: findHtml(item.question.question),
            }}
          /> */}
          {console.log('answers', item.answers)}
          {item.question.url !== '' && item.question.url !== null ? (
            <WebView
              style={{width: 250, height: 250}}
              source={{
                uri: 'http://elearning-uat.tmgs.vn' + item.question.url,
              }}
            />
          ) : null}
          {/* {answerShow(item.answers)} */}
          {/* if(item.answers) */}

          {/* {item.answers.length < 3 ? (
            <View>
              <CheckBox
                // testID
                disabled={false}
                value={checked}
                onValueChange={(newValue) => setChecked(newValue)}
              />
              <CheckBox
                disabled={false}
                value={checked}
                onValueChange={(newValue) => setChecked(newValue)}
              />
            </View>
          ) : null} */}
          {/* {item.answers.length < 3 ? (
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue1) => setToggleCheckBox(newValue1)}
            />
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue2) => setToggleCheckBox(newValue2)}
            />
          ) : null} */}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'Tên cuộc thi'} />
      <View style={styles.viewTime}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: scale(30),
            height: scale(30),
            marginLeft: scale(15),
            alignSelf: 'center',
          }}
          source={require('../../img/clock.png')}
        />
        <CountDown
          style={{alignSelf: 'center', marginLeft: 10}}
          until={timeRoundB}
          size={30}
          onFinish={() => alert('Hết thời gian làm bài')}
          // eslint-disable-next-line react-native/no-inline-styles
          digitStyle={{
            // backgroundColor: '#FFF',
            height: 40,
            width: 40,
          }}
          // timeLabelStyle={{color: 'red', fontWeight:}}
          digitTxtStyle={{color: 'black'}}
          separatorStyle={{color: 'black'}}
          showSeparator
          timeToShow={['M', 'S']}
          timeLabels={{m: null, s: null}}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.question.id.toString()}
      />
      <TouchableOpacity style={styles.buttonSubmit} onPress={() => {}}>
        <Text style={{color: '#FFF', fontSize: scale(15)}}>Nộp bài</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTime: {
    height: scale(60),
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  viewQuestion: {
    flex: 1,
    marginTop: 5,
    backgroundColor: '#F0F8FF',
  },
  buttonSubmit: {
    width: scale(300),
    height: scale(45),
    borderRadius: scale(20),
    backgroundColor: '#FCB71E',
    marginTop: scale(20),
    marginBottom: scale(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQuestion: {
    fontSize: scale(18),
    lineHeight: scale(20),
    marginLeft: scale(10),
    fontWeight: '400',
  },
});
