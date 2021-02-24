import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackbarWhite from '../components/BackBarWhite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HTML from 'react-native-render-html';

const EventsDetail = () => {
  const [newID, setNewID] = useState();
  const [dataEvent, setDataEvent] = useState([]);
  const [getting, setGetting] = useState(false);
  const [newsID, setNewsID] = useState('');
  const route = useRoute();
  const getEvents = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/event/detail/${route.params.eventid}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.eventtoken}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response);
        console.log(response.data.data);
        setDataEvent(response.data.data);
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
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const contentWidth = (useWindowDimensions().width * 90) / 100;
  return (
    <View style={styles.container}>
      <BackbarWhite title={'Events'} />
      <ScrollView style={styles.scrollArea}>
        <Text style={styles.textTitle}>{dataEvent.title}</Text>
        <Text>Author: {dataEvent.createdBy}</Text>
        <Image
          style={styles.imageNew}
          source={{uri: 'http://elearning-uat.vnpost.vn' + dataEvent.image}}
        />
        <View style={styles.contentContainer}>
          <HTML
            defaultTextProps={styles.text}
            source={{html: dataEvent.content}}
            contentWidth={contentWidth}
            baseFontStyle={styles.text}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default EventsDetail;

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
  image: {
    flex: 1,
    height: scale(180),
    width: scale(350),
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
    marginBottom: scale(10),
  },
  scrollArea: {
    flex: 1,
    alignContent: 'center',
  },
  image23: {
    flex: 1,
    height: scale(160),
    width: scale(330),
  },
  contentContainer: {
    flex: 1,
    marginLeft: scale(8),
    marginRight: scale(8),
    alignContent: 'center',
  },
  textTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: scale(14),
    marginLeft: scale(8),
    marginRight: scale(8),
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  content: {
    fontWeight: '400',
    fontSize: scale(14),
  },
  newData: {
    flex: 1,
    backgroundColor: 'gray',
  },
});
