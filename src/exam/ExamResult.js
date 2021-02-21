import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {
  BuildingIcon,
  CalendarIcon,
  FlagTickIcon,
  ClockIcon,
  CircleCheckIcon,
} from '../../svg/icon';
import {TextInput} from 'react-native-gesture-handler';

const ExamResult = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ExamID, setExamID] = useState('');
  const [dataExam, setDataExam] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [getting, setGetting] = useState(false);
  const [sendID, setSendID] = useState('');
  // /api/roundtest/{id_round}/request
  const sendRequest = async (id) => {
    await axios
      .post(
        `http://elearning-uat.vnpost.vn/api/roundtest/${id}/request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${route.params.examTK}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('finally');
      });
  };
  const getExams = async () => {
    await axios
      .get(
        'http://elearning-uat.vnpost.vn/api/competition/roundtest/history/list/151',
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response);
        console.log(response.data.data);
        setDataExam(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setGetting(false);
      });
  };
  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Backbar title={'ExamDetail'} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageNew}
          source={{
            uri:
              'http://elearning-uat.vnpost.vn/static/images/default_thumb_exam.png',
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>asdasdasd</Text>
        </View>
        <View style={styles.iconAndTextTop}>
          <Text style={styles.authorText}>Đơn vị tạo cuộc thi: </Text>
          <BuildingIcon color="#17a2b8" />
          <Text style={styles.text}>asdasdadad</Text>
        </View>
      </View>
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
    height: scale(90),
  },
  titleContainer: {
    width: '98%',
    backgroundColor: '#fffce1',
  },
  textTitle: {
    fontSize: scale(25),
    textAlign: 'center',
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
  },
  iconAndTextTop: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
