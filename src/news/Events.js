import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthorIcon,
  DateAndTimeIcon,
  MenuIcon,
  CancelIcon,
} from '../../svg/icon';

const MainEvents = () => {
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [dataEvent, setDataEvent] = useState([]);
  const [getting, setGetting] = useState(false);
  const [token, setToken] = useState('');
  const [ImageURL, setImageURL] = useState([]);
  const [countEvent, setCountEvent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [CategoryEvent, setCategoryEvent] = useState([]);
  const [CateId, setCateId] = useState('');
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
  const GetCategoryEvent = () => {
    axios
      .get('https://elearning.tmgs.vn/api/event/category/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategoryEvent(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        console.log('cate');
        setCateId('');
      });
  };
  const getEvents = async () => {
    await getToken();
    await axios
      .post(
        'https://elearning.tmgs.vn/api/v2/event/all?size=10',
        {title: null, categoryId: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        console.log(response);
        setDataEvent(response.data.data);
        response.data.data.length === null
          ? setCountEvent(countEvent + 1)
          : null;
      })
      .catch(function (error) {
        // handle error
        setCountEvent(countEvent + 1);
        console.log(error);
      })
      .finally(() => {
        setGetting(false);
      });
  };
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countEvent]);
  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <TouchableOpacity
        style={[styles.itemNew, {backgroundColor}]}
        onPress={() =>
          navigation.navigate('EventsDetail', {
            eventid: item.id,
            eventtoken: token,
          })
        }>
        <Image
          style={styles.imageNew}
          source={{uri: 'http://elearning.tmgs.vn' + item.image}}
        />
        <View style={styles.viewNew}>
          <Text style={styles.titleNew} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.iconAndText}>
            <Text style={styles.authorText}>
              <AuthorIcon /> {item.createdBy}
            </Text>
            <Text style={styles.authorText}>
              <DateAndTimeIcon /> {'  '}
              {new Date(item.timeCreate).toLocaleString('en-GB', {
                timeZone: 'UTC',
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem1 = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemCategory}
        onPress={() => {
          setCateId(item.id);
          setCountEvent(countEvent + 1);
          setModalVisible(false);
        }}>
        <Text style={styles.smallModalText}>{item.nameDetail}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.MenuIconContainer}>
        <TouchableOpacity
          style={styles.MenuIconArea}
          onPress={() => {
            setModalVisible(true);
            GetCategoryEvent();
          }}>
          <MenuIcon height={40} width={40} color="#000000" />
        </TouchableOpacity>
      </View>
      {dataEvent.length === 0 ? (
        <View>
          <Text>Chưa có sự kiện</Text>
        </View>
      ) : (
        <FlatList
          style={{marginTop: scale(20)}}
          data={dataEvent}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={newsID}
          refreshing={getting}
          onRefresh={() => getEvents()}
        />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.smallCenteredView}>
          <View style={styles.smallModalView}>
            <View style={styles.modalIcon}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <CancelIcon />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CategoryEvent}
              renderItem={renderItem1}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default MainEvents;

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
    height: scale(80),
    width: '95%',
    justifyContent: 'space-between',
    marginBottom: scale(8),
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#f6821f',
  },
  authorText: {
    fontSize: scale(12),
  },
  iconAndText: {
    marginTop: scale(5),
    marginHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MenuIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  MenuIconArea: {
    height: scale(40),
    width: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    marginTop: scale(10),
  },
  itemCategory: {
    backgroundColor: '#f0f0f0',
    marginBottom: scale(10),
    paddingLeft: scale(5),
  },
  smallCenteredView: {
    flex: 1,
    alignItems: 'center',
  },
  smallModalView: {
    height: scale(280),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(8),
    marginTop: scale(110),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
  },
  modalIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: scale(30),
    alignItems: 'center',
  },
});
