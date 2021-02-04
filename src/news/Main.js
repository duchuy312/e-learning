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

const MainNews = () => {
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [dataNew, setDataNew] = useState([]);
  const [getting, setGetting] = useState(false);
  const [token, setToken] = useState('');
  const [ImageURL, setImageURL] = useState([]);
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
  const getNews = async () => {
    await getToken();
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/v2/news/all?size=8',
        {title: null, categoryId: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response.data.data);
        setDataNew(response.data.data);
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
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <TouchableOpacity style={[styles.itemNew, {backgroundColor}]}>
        <Image
          style={styles.imageNew}
          source={{uri: 'http://elearning-uat.vnpost.vn' + item.images}}
        />
        <View style={styles.viewNew}>
          <Text style={styles.titleNew} numberOfLines={3}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataNew}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={newsID}
        numColumns={2}
        refreshing={getting}
        onRefresh={() => getNews()}
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
    height: scale(200),
    elevation: scale(5),
    overflow: 'hidden',
  },
  imageNew: {
    flex: 1,
    height: scale(110),
    width: scale(159),
    resizeMode: 'stretch',
  },
  viewNew: {
    height: scale(70),
    width: scale(145),
  },
  titleNew: {
    fontSize: scale(14),
    marginLeft: scale(5),
    fontWeight: 'bold',
  },
});
