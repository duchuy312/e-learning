import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {StarIcon} from '../../svg/icon';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CourseBar from '../components/CourseBar';

const WareCourse = () => {
  const navigation = useNavigation();
  const [dataWare, setDataWare] = useState([]);
  const [wareDetail, setWareDetail] = useState([]);
  const WareID = useState('');
  const route = useRoute('');
  const [count, setCount] = useState(0);
  const getWare = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/course-ware/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        var Detail = [];
        for (var i = 0; i < response.data.data.length; i++) {
          Detail[i] = response.data.data[0].chapterCourseWares[i];
        }
        setWareDetail(Detail);
        setDataWare(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        if (dataWare.length === 0) {
          setCount(count + 1);
        } else {
          console.log(dataWare);
          console.log(wareDetail[0]);
        }
      });
  };
  useEffect(() => {
    getWare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const renderItem = ({item, index}) => {
    console.log(wareDetail[index]);
    return (
      <View style={styles.WareContainer}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.vnpost.vn/static/images/default_thumb_course.png',
          }}
        />
      </View>
      <FlatList
        data={dataWare}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={WareID}
      />
    </View>
  );
};
export default WareCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  logocontainer: {
    height: scale(200),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(1 / 4),
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
  },
  WareContainer: {
    width: '100%',
    height: scale(100),
    borderBottomWidth: scale(1 / 2),
    flexDirection: 'row',
  },
});
