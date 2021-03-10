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
            percent: route.params.percent,
            nameCompetition: route.params.nameCompetition,
            imageCompetition: route.params.imageCompetition,
            percentPoint: route.params.percentPoint,
            percentTrue: route.params.percentTrue,
            pass: route.params.qualified,
            image: route.params.avatar,
          })
        }>
        <View style={styles.view}>
          <View>
            <Image
              source={require('../../img/image11.png')}
              style={styles.stretch}
            />
          </View>
          <View style={{flex: 6, marginLeft: 8}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              <Text>{route.params.name}</Text>
            </Text>
            <View style={{marginTop: 5}}>
              <Text>Kết quả:{route.params.percentPoint}</Text>
              <Text>Xếp loại: Đạt{route.params.idUser}</Text>
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
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginTop: 10,
    width: '90%',
    height: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    flex: 1,
    justifyContent: 'space-around',
    borderRadius: 30,
    width: 100,
    height: 100,
    marginLeft: 10,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  image: {
    marginRight: 10,
    height: 30,
    width: 20,
  },
});
