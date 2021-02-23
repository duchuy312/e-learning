import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {scale} from 'react-native-size-matters';

import {Header} from '../components/header';
import StarRating from '../components/Star';

const Documents = ({navigation, route}) => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6IlJPTEVfU1VQRVJfQURNSU4iLCJ1bml0IjoiMSIsImlkIjoxNTA3NDIsIkZVTExfTkFNRSI6IkFkbWluIiwiaWF0IjoxNjEzOTY0OTI0LCJleHAiOjE2MTQwNTEzMjR9.Lvy_w2X-ceVopzCnCuw_mTXqtHCI5ud1e20weFtU-Ig',
  );
  const [courseId, setCourseID] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
        //console.log('We have Token');
        setToken(value);
      } else {
        //console.log('Dont have Token');
      }
      const courseId = await AsyncStorage.getItem('@courseID');
      if (courseId !== null) {
        setCourseID(courseId);
      } else {
        console.log('cant get course id in detail');
      }
    } catch (err) {
      console.log('Read data token in course error');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>documents</Text>
    </View>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd'},
});
