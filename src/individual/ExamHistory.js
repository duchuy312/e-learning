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
import Backbar from '../components/BackBar';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation, useRoute} from '@react-navigation/native';

const ExamHistory = () => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Backbar title={'Lịch sử thi'} />
      <View style={styles.avatarContainer}>
        <ProgressCircle
          percent={route.params.percentPoint}
          radius={45}
          borderWidth={8}
          color="#FCB71E"
          shadowColor="#f7ecdb"
          bgColor="#fff">
          <Text style={{fontSize: 18}}>
            {route.params.percentPoint.toFixed(2)} %
          </Text>
        </ProgressCircle>
        <Text>Tỉ lệ điểm trung bình trên mỗi đề thi đã làm</Text>
        <ProgressCircle
          percent={route.params.percentTrue * 100}
          radius={45}
          borderWidth={8}
          color="#FCB71E"
          shadowColor="#f7ecdb"
          bgColor="#fff">
          <Text style={{fontSize: 18}}>
            {route.params.percentTrue.toFixed(4) * 100} %
          </Text>
        </ProgressCircle>
        <Text>Trung bình số câu trả lời đúng trên mỗi đề thi đã làm</Text>
        <ProgressCircle
          percent={
            (route.params.testDone /
              (route.params.testWait + route.params.testDone)) *
            100
          }
          radius={45}
          borderWidth={45}
          color="#FCB71E"
          shadowColor="#f7ecdb"
          bgColor="#fff">
          <Text style={{fontSize: 18}}>
            {(
              route.params.testDone /
              (route.params.testWait + route.params.testDone)
            ).toFixed(4) * 100}{' '}
            %
          </Text>
        </ProgressCircle>
        <Text>
          Đã làm {route.params.testDone} trên tổng số{' '}
          {route.params.testWait + route.params.testDone} bài
        </Text>
      </View>
    </View>
  );
};

export default ExamHistory;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', alignItems: 'center'},
  avatarContainer: {
    marginTop: scale(60),
    height: scale(160),
    width: scale(160),
  },
});
