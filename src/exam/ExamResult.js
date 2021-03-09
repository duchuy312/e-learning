import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {BuildingIcon, ClockIcon} from '../../svg/icon';
import ProgressCircle from 'react-native-progress-circle';

const ExamResult = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [ExamID] = useState('');
  const [dataExam, setDataExam] = useState([]);
  const [getting, setGetting] = useState(false);
  // /api/roundtest/{id_round}/request
  const getExams = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/competition/roundtest/history/list/${route.params.idRound}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response.data.data);
        setDataExam(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setGetting(false);
        console.log(dataExam.length);
      });
  };
  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemExam}>
        <View style={styles.circleProgressContainer}>
          <ProgressCircle
            percent={(item.point / item.sumPoint) * 100}
            radius={45}
            borderWidth={8}
            color="#FCB71E"
            shadowColor="#f7ecdb"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>
              {(item.point / item.sumPoint).toFixed(3) * 100} %
            </Text>
          </ProgressCircle>
        </View>
        <View>
          <Text>Lần Thi: {item.counttest}</Text>
          <Text>
            Làm bài lúc :{' '}
            {new Date(item.timestart).toLocaleString('en-GB', {
              timeZone: 'UTC',
            })}
          </Text>
          <Text>
            Nộp bài lúc :{' '}
            {new Date(item.timeend).toLocaleString('en-GB', {
              timeZone: 'UTC',
            })}
          </Text>
          <Text>Trạng Thái: {item.status === 1 ? 'Chưa Đạt' : 'Đạt'}</Text>
          <Text>
            Tỉ lệ Điểm : {item.point} / {item.sumPoint}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'ExamDetail'} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.tmgs.vn/static/images/default_thumb_exam.png',
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>{route.params.name}</Text>
        </View>
        <View style={styles.iconAndTextTop}>
          <Text style={styles.authorText}>Đơn vị tạo cuộc thi:</Text>
          <BuildingIcon color="#17a2b8" />
          <Text style={styles.text}>{route.params.namePS}</Text>
        </View>
        <View style={styles.iconAndText}>
          <ClockIcon clockheight={scale(15)} clockwidth={scale(14)} />
          <Text style={styles.text}>{route.params.timeExam} phút</Text>
        </View>
        <Text>Bạn đã làm bài thi này {dataExam.length} lần</Text>
        {route.params.doAgain === 0 ? (
          <View>
            <Text>Vòng thi không giới hạn số lần làm bài</Text>
            <TouchableOpacity
              style={styles.littleButton}
              onPress={() =>
                navigation.navigate('DoingExam', {
                  idRound: route.params.idRound,
                  token: route.params.token,
                  timeRound: route.params.timeExam,
                })
              }>
              <Text>Làm bài</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>
            Vòng thi này bạn chỉ có thể làm {route.params.doAgain} lần
          </Text>
        )}
      </View>
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataExam}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={ExamID}
        refreshing={getting}
        onRefresh={() => getExams()}
      />
    </View>
  );
};
export default ExamResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
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
    marginBottom: scale(10),
    borderWidth: scale(2),
    borderColor: 'black',
  },
  contentContainer: {
    marginLeft: scale(8),
    marginRight: scale(8),
    alignItems: 'center',
    backgroundColor: 'white',
    height: scale(148),
  },
  titleContainer: {
    width: '98%',
    backgroundColor: '#fffce1',
  },
  textTitle: {
    fontSize: scale(25),
    textAlign: 'center',
    color: 'black',
  },
  text: {
    marginLeft: scale(5),
    fontSize: scale(14),
  },
  content: {
    fontWeight: '400',
    fontSize: scale(12),
    marginLeft: scale(5),
  },
  greentext: {
    color: 'green',
    fontWeight: '400',
    fontSize: scale(12),
    marginLeft: scale(5),
  },
  newData: {
    flex: 1,
    backgroundColor: 'gray',
  },
  imageContainer: {
    width: '100%',
    height: '35%',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(5),
  },
  iconAndTextTop: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    color: '#f6821f',
    fontSize: scale(14),
  },
  resultContainer: {
    marginTop: scale(10),
    marginLeft: scale(8),
    marginRight: scale(8),
    backgroundColor: 'white',
  },
  tableTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemExam: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: scale(8),
    borderRadius: scale(10),
    marginBottom: scale(8),
    height: scale(90),
    width: '96%',
    elevation: scale(2),
    overflow: 'hidden',
    alignItems: 'center',
  },
  circleProgressContainer: {
    width: scale(90),
    height: scale(100),
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: scale(8),
    borderRadius: scale(5),
  },
  littleButton: {
    backgroundColor: '#FCB71E',
    height: scale(20),
    width: scale(60),
    alignSelf: 'center',
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: scale(3),
    marginTop: scale(5),
  },
});
