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
import CourseBar from '../components/CourseBar';
import {DownloadIcon} from '../../svg/icon';

const Documents = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [dataDoc, setDataDoc] = useState([]);
  const [countDocs, setCountDocs] = useState(0);
  const DocID = useState('');
  const getDoc = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/document/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        setDataDoc(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log(dataDoc);
      });
  };
  useEffect(() => {
    getDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={styles.DocContainer}>
        <View style={styles.ContentContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text>{item.originName}</Text>
          <Text>{item.sizes}</Text>
          <Text style={styles.timeText}>
            Phát hành: {new Date(item.timeCreate).toLocaleDateString('en-GB')}
          </Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity>
            <DownloadIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={dataDoc}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={DocID}
      />
    </View>
  );
};
export default Documents;

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
  scrollArea: {
    flex: 1,
    alignContent: 'center',
  },
  scrollcontent: {
    alignContent: 'center',
    flex: 1,
  },
  DocContainer: {
    width: '100%',
    height: scale(90),
    borderBottomWidth: scale(1 / 2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  IconContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentContainer: {
    width: '85%',
    height: '100%',
    justifyContent: 'center',
  },
  timeText: {
    color: '#cecece',
  },
  titleText: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});
