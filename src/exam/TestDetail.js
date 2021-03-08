import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import styles from './Style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
export default function TestDetail({route}) {
  // const { setLesson } = props;
  const navigation = useNavigation();
  const [dataExam, setDataExam] = useState([]);
  const {examName, idExam, examTK} = route.params;
  const [count, setCount] = useState(0);
  const getExamsDetail = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/competition/${idExam}/roundTest/list`,
        {
          headers: {
            Authorization: `Bearer ${examTK}`,
          },
        },
      )
      .then((response) => {
        // console.log('getExamsDetail', response);
        setDataExam(response.data.data[0]);
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
    if (examTK.length > 0) {
      getExamsDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examTK]);
  //
  // console.log('exam details,', dataExam);
  return (
    <View style={styles.container}>
      <Backbar title={'Chi tiết cuộc thi'} />
      <View style={styles.body}>
        <Image
          source={require('../../img/image26.png')}
          style={styles.imageDetailTest}
        />
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingLeft: scale(20),
            paddingTop: scale(30),
            fontWeight: '700',
            fontSize: scale(20),
          }}>
          {examName}
        </Text>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingLeft: scale(20),
            paddingTop: scale(20),
            fontWeight: '400',
            fontSize: scale(14),
          }}>
          Ngày thi: {'Không giới hạn thời gian'}
        </Text>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingLeft: scale(20),
            paddingTop: scale(15),
            fontWeight: '400',
            fontSize: scale(14),
          }}>
          Điều kiện tham gia: Nhân viên bộ phận kỹ thuật
        </Text>
        <View style={{flexDirection: 'row', paddingTop: scale(15)}}>
          <Image
            style={{
              width: scale(16),
              height: scale(16),
              marginLeft: scale(20),
              marginRight: scale(5),
            }}
            source={require('../../img/clock.png')}
          />
          <Text>{dataExam.timeRound / 60} phút</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              paddingLeft: scale(20),
              paddingTop: scale(15),
              fontWeight: '400',
              fontSize: scale(14),
            }}>
            Trạng thái:
          </Text>
          {dataExam.message === 'MY_COMPETITION_DONE' ? (
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                paddingTop: scale(15),
                fontWeight: '400',
                fontSize: scale(14),
                color: 'green',
              }}>
              {' Đã thi'}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={styles.buttonDetail}
          onPress={() =>
            navigation.navigate('TestChoice', {
              tokenResult: examTK,
              idChoice: dataExam.id,
              nameRoundC: dataExam.nameRound,
              idRound: idExam,
            })
          }>
          <Text style={{color: '#FFF', fontSize: scale(15)}}>Vào thi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
