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
import {RadioButton} from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation, useRoute} from '@react-navigation/native';

const ExamHistory = () => {
  const route = useRoute();
  const [value, setValue] = React.useState('A');
  return (
    <View style={styles.container}>
      <Backbar title={'Bài thi số 1'} />
      <View style={styles.avatarContainer}>
        <ProgressCircle
          percent={route.params.percentPoint}
          radius={60}
          borderWidth={7}
          color="#FCB71E"
          shadowColor="#999"
          bgColor="#fff">
          <Text style={{fontSize: 18}}>{'CHƯA ĐẠT'}</Text>
          <Text style={{fontSize: 18}}>{route.params.percentPoint}</Text>
        </ProgressCircle>
      </View>
      <View style={styles.exam}>
        <Text style={styles.text}>
          Câu 1: Tổng nhân sự trên toàn mạng lưới là bao nhiêu người?
        </Text>
        <View style={styles.radio}>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}>
            <View style={styles.view}>
              <View style={styles.radio}>
                <View style={styles.radio}>
                  <RadioButton value="A" />
                  <Text>7.000</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton value="B" />
                  <Text>8.000</Text>
                </View>
              </View>
              <View style={styles.radio}>
                <View style={styles.radio}>
                  <RadioButton value="C" />
                  <Text>70.000</Text>
                </View>
                <View style={styles.radio}>
                  <RadioButton value="D" />
                  <Text>80.000</Text>
                </View>
              </View>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </View>
  );
};

export default ExamHistory;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', alignItems: 'center'},
  avatarContainer: {
    height: scale(160),
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#144E8C',
  },
  exam: {
    marginTop: 20,
    width: '90%',
  },
  text: {
    fontSize: 18,
  },
  radio: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
