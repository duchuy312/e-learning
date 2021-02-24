import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthorIcon, FlagTickIcon} from '../../svg/icon';
import TitleBar from '../components/TitleBar';

const MainCourse = () => {
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [dataCourse, setDataCourse] = useState([]);
  const [getting, setGetting] = useState(false);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
        console.log('We have Token');
        setToken(value);
      } else {
        console.log('Dont have Token');
      }
    } catch (err) {
      console.log('Read data error');
    }
    console.log('Done.');
  };
  const getCourse = async () => {
    await getToken();
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/course',
        {categoryId: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        setDataCourse(response.data.data);
        response.data.data.length === null ? setCount(count + 1) : null;
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      })
      .finally(() => {
        console.log(dataCourse);
        setGetting(false);
      });
  };
  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <TouchableOpacity style={[styles.itemNew, {backgroundColor}]}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.vnpost.vn/static/images/default_thumb_course.png',
          }}
        />
        <View style={styles.viewNew}>
          <Text style={styles.titleNew} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.iconAndText}>
            <AuthorIcon />
            <Text style={styles.authorText}>{item.createdBy}</Text>
          </View>
          <View style={styles.iconAndText}>
            <FlagTickIcon />
            <Text style={styles.timeText}>Không yêu cầu đăng ký</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TitleBar title1={'Khóa Học'} />
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataCourse}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={newsID}
        refreshing={getting}
        onRefresh={() => getCourse()}
      />
    </View>
  );
};
export default MainCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  itemNew: {
    marginHorizontal: scale(8),
    alignItems: 'center',
    borderRadius: scale(15),
    marginVertical: scale(8),
    borderRightColor: '#d3d4d4',
    height: scale(320),
    width: '96%',
    elevation: scale(5),
    overflow: 'hidden',
  },
  imageNew: {
    flex: 1,
    height: scale(110),
    width: '100%',
    resizeMode: 'stretch',
  },
  viewNew: {
    height: scale(90),
    width: '95%',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#f6821f',
  },
  iconAndText: {
    marginTop: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    marginLeft: scale(10),
    color: '#17a2b8',
    fontSize: scale(14),
  },
  timeText: {
    color: 'black',
    marginLeft: scale(10),
    fontSize: scale(14),
  },
});
