/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Backbar from '../components/BackBar';
import {useNavigation, useRoute} from '@react-navigation/native';

const History = ({navigation, item}) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Backbar title={'Lịch sử thi'}></Backbar>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ExamHistory', {
            percent: route.params.percentPoint,
            nameCompetition: route.nameCompetition,
            imageCompetition: route.imageCompetition,
            percentPoint: route.percentMediumPoint,
            percentTrue: route.percentMediumQuestion,
            pass: route.qualified,
            image: route.params.avatar,
          })
        }>
        <View style={styles.view}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{
                uri: 'http://elearning-uat.vnpost.vn' + route.params.avatar,
              }}
              style={styles.stretch}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 6}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              <Text>{route.params.name}</Text>
            </Text>
            <View style={{marginTop: 5}}>
              <Text>Kết quả: 90/100{route.params.percentMediumPoint}</Text>
              <Text>Xếp loại: Đạt</Text>
              <Text>27/9/2020</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.image}
              source={require('../../img/greater.png')}></Image>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {flex: 1},
  view: {
    borderRadius: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginTop: 10,
  },
  stretch: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 30,
    width: 100,
    height: 100,
    marginLeft: 10,
    resizeMode: 'stretch',
  },
  image: {
    marginTop: '40%',
    marginRight: 30,
    height: 30,
    width: 20,
  },
});
