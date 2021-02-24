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
import {BuildingIcon, ClockIcon} from '../../svg/icon';
import TitleBar from '../components/TitleBar';

const MainNews = () => {
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [dataExam, setDataExam] = useState([]);
  const [getting, setGetting] = useState(false);
  const [token, setToken] = useState('');
  const [colorBar, setColorBar] = useState('');
  const [ImageURL, setImageURL] = useState([]);
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
  const getExams = async () => {
    await getToken();
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/v2/competition/list/all',
        {title: null, categoryId: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        setDataExam(response.data.data);
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      })
      .finally(() => {
        setGetting(false);
      });
  };
  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <TouchableOpacity
        style={[styles.itemNew, {backgroundColor}]}
        onPress={() =>
          navigation.navigate('ExamDetail', {
            examTK: token,
            idExam: item.id,
            examName: item.nameCompetition,
            examPS: item.poscodeVnpost.name,
          })
        }>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.vnpost.vn/static/images/default_thumb_exam.png',
          }}
        />
        <View style={styles.viewNew}>
          <Text style={styles.titleNew} numberOfLines={1}>
            {item.nameCompetition}
          </Text>
          <View style={styles.iconAndText}>
            <BuildingIcon color="#17a2b8" />
            <Text style={styles.authorText}>{item.poscodeVnpost.name}</Text>
          </View>
          <View style={styles.iconAndText}>
            <ClockIcon clockheight={scale(18)} clockwidth={scale(16)} />
            <Text style={styles.timeText}>Không giới hạn thời gian</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TitleBar title1={'Cuộc thi'}/>
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataExam}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={newsID}
        refreshing={getting}
        onRefresh={() => getExams()}
      />
    </View>
  );
};
export default MainNews;

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
