import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {StarIcon} from '../../svg/icon';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CourseBar from '../components/CourseBar';

const CourseDetail = () => {
  const navigation = useNavigation();
  const [dataCourse, setDataCourse] = useState([]);
  const [dataRate, setDataRate] = useState([]);
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [register, setRegister] = useState([]);
  const requestOne = axios.get(
    `http://elearning-uat.vnpost.vn/api/course/${route.params.CourseID}`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const requestTwo = axios.get(
    `http://elearning-uat.vnpost.vn/api/v2/course/rating/${route.params.CourseID}`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const requestThree = axios.get(
    `http://elearning-uat.vnpost.vn/api/course/courseJoin/${route.params.CourseID}/currentUser`,
    {
      headers: {
        Authorization: `Bearer ${route.params.CourseTK}`,
      },
    },
  );
  const getCourse = async () => {
    await axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((response, response1, response2) => {
          setDataCourse(response.data.data);
          setDataRate(response1.data.data);
          setRegister(response2.data.data);
        }),
      )
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        if (dataCourse.length === 0 || dataRate.length === 0) {
          setCount(count + 1);
        } else {
          console.log(dataCourse);
          setLoading(true);
        }
      });
  };
  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.scrollArea}>
          <Image
            style={styles.imageNew}
            source={{
              uri:
                'http://elearning-uat.vnpost.vn/static/images/default_thumb_course.png',
            }}
          />
          {loading ? (
            <View>
              <View style={styles.bar}>
                <View>
                  <Text style={styles.textTitle}>Người tạo: </Text>
                  <Text>{dataCourse.createdBy}</Text>
                </View>
                <View style={styles.line} />
                <View>
                  <Text style={styles.textTitle}>Đánh Giá: </Text>
                  <View style={styles.iconAndText}>
                    <Text>{dataRate.avarageRate}/5 </Text>
                    <StarIcon color={'#007bff'} />
                  </View>
                </View>
                <View style={styles.line} />
                <View>
                  <Text style={styles.textTitle}>Danh mục: </Text>
                  <Text>{dataCourse.coursecategory.name}</Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.TopContent}>
                  <Text style={styles.titleNew}>{dataCourse.name}</Text>
                  <View style={styles.iconAndText}>
                    <StarIcon
                      color={dataRate.avarageRate > 0 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 0 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 1 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 1 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 2 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 2 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 3 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 3 ? '#FCB71E' : '#f4ebdf'}
                    />
                    <StarIcon
                      color={dataRate.avarageRate > 4 ? '#FCB71E' : '#f4ebdf'}
                      color1={dataRate.avarageRate > 4 ? '#FCB71E' : '#f4ebdf'}
                    />
                  </View>
                  <View style={styles.time}>
                    <Text>
                      Bắt đầu:{' '}
                      {new Date(
                        dataCourse.courseConfig.start,
                      ).toLocaleDateString('en-GB')}
                    </Text>
                    <Text>
                      Kết thúc:{' '}
                      {new Date(
                        dataCourse.courseConfig.start,
                      ).toLocaleDateString('en-GB')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.contentText}>{dataCourse.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('WareCourse', {
                      CourseID: route.params.CourseID,
                      CourseTK: route.params.CourseTK,
                    })
                  }>
                  <Text style={styles.buttontext}>
                    {register ? 'Vào học' : 'Đăng ký học'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={styles.whiteSpace} />
        </View>
      </ScrollView>
    </View>
  );
};
export default CourseDetail;

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
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
  },
  scrollcontent: {
    alignContent: 'center',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(290),
    width: '90%',
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  text: {
    fontSize: scale(14),
    lineHeight: scale(20),
  },
  content: {
    fontWeight: '400',
    fontSize: scale(14),
  },
  newData: {
    flex: 1,
    backgroundColor: 'gray',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#f6821f',
    textAlign: 'center',
  },
  line: {
    height: '80%',
    width: scale(1 / 2),
    backgroundColor: 'black',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    height: scale(50),
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconAndText: {
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
    elevation: 5,
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(250),
  },
  contentText: {
    fontSize: scale(16),
  },
  ScrollContainer: {
    width: '100%',
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    alignContent: 'center',
    height: '300%',
  },
  whiteSpace: {
    height: scale(450),
  },
  TopContent: {
    alignItems: 'center',
    height: scale(100),
    justifyContent: 'space-between',
  },
});
