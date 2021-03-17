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

const WareCourse = () => {
  const navigation = useNavigation();
  const [dataWare, setDataWare] = useState([]);
  const [wareDetail, setWareDetail] = useState([]);
  const WareID = useState('');
  const route = useRoute('');
  const [count, setCount] = useState(0);
  const [countDone, setCountDone] = useState(0);
  const getWare = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/course-ware/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        const Detail = [];
        for (var i = 0; i < response.data.data.length; i++) {
          Detail[i] = response.data.data[i].chapterCourseWares;
        }
        setWareDetail(Detail);
        setDataWare(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setCount(count + 1);
      });
  };
  const CheckWare = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/v2/course/final/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.data.chapterDTOs.length; i++) {
          if (
            response.data.data.chapterDTOs[i].checkCompleteChapter === 'true'
          ) {
            setCountDone(countDone + 1);
          }
          console.log('Số chương hoàn thành :', countDone);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  var ArrView = [];
  var ArrViewWithKey = [];
  for (let i = 0; i < wareDetail.length; i++) {
    for (let j = 0; j < wareDetail[i].length; j++) {
      ArrView.push(
        <View key={i}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VideoPlayer', {
                urlFile: wareDetail[i][j].courseWare.files,
                name: wareDetail[i][j].courseWare.name,
                content: wareDetail[i][j].courseWare.content,
              })
            }>
            <Text style={styles.linkText}>
              {wareDetail[i][j].courseWare.name}
            </Text>
          </TouchableOpacity>
        </View>,
      );
    }
  }
  for (let i = 0; i < wareDetail.length; i++) {
    ArrViewWithKey[i] = ArrView.filter((dataView) => {
      return dataView.key === `${i}`;
    });
  }
  console.log(wareDetail);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.WareContainer}>
        <Text style={styles.title}>
          {item.name}, {item.id}
        </Text>
        {wareDetail[index] === undefined ? (
          <Text>Chưa có học liệu cho chương mục này !</Text>
        ) : (
          <View>{ArrViewWithKey[index]}</View>
        )}
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
              'http://elearning-uat.tmgs.vn/static/images/default_thumb_course.png',
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          CheckWare();
        }}>
        <Text style={styles.buttontext}>Thi cuối khóa</Text>
      </TouchableOpacity>
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
    padding: scale(10),
  },
  title: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
  },
  button: {
    backgroundColor: 'orange',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: scale(5),
    marginBottom: scale(10),
  },
  buttontext: {
    fontSize: scale(18),
    color: 'white',
  },
});
