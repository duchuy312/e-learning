import React, {useState} from 'react';
// eslint-disable-next-line prettier/prettier
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import ViewBar from './ViewBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect} from 'react';
import {BuildingIcon, ClockIcon} from '../../svg/icon';
import {useNavigation} from '@react-navigation/native';
const MainExam = () => {
  // const {setLesson} = props;
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [token, setToken] = useState('');
  const [getting, setGetting] = useState(false);
  const [dataExam, setDataExam] = useState([]);
  const [count, setCount] = useState(0);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@MyToken');
      if (value !== null) {
        console.log('we have Token');
        setToken(value);
      } else {
        console.log('Dont have Token');
      }
    } catch (error) {
      console.log('Read data error');
    }
  };
  const getExams = async () => {
    await getToken();
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/v2/competition/list/all',
        {searchValue: null, categoryId: null},
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
    return (
      <View style={styles.itemNew}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TestDetail', {
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
            <Text style={styles.titleNew} numberOfLines={2}>
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
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewBar}>
        <ViewBar />
      </View>
      <FlatList
        data={dataExam}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // extraData={newsID}
        refreshing={getting}
        onRefresh={() => getExams()}
        // numColumns={2}
      />
    </View>
  );
};

export default MainExam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  viewBar: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#144E8C',
    height: scale(70),
  },
  itemNew: {
    overflow: 'scroll',
    borderRadius: scale(15),
    backgroundColor: '#FFF',
    height: scale(350),
    marginTop: scale(10),
    marginLeft: scale(5),
    marginRight: scale(5),
    marginBottom: scale(5),
  },
  imageNew: {
    // flex: 1,
    height: scale(210),
    width: '100%',
    resizeMode: 'stretch',
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
  },
  viewNew: {
    width: '100%',
  },
  titleNew: {
    marginTop: scale(10),
    fontSize: scale(22),
    fontWeight: 'bold',
    color: '#f6821f',
    marginLeft: scale(10),
  },
  iconAndText: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(10),
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
