import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BuildingIcon,
  ClockIcon,
  MenuIcon,
  BellIcon,
  SearchIcon,
  CancelIcon,
} from '../../svg/icon';

const MainNews = () => {
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [dataExam, setDataExam] = useState([]);
  const [getting, setGetting] = useState(false);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [CateId, setCateId] = useState('');
  const [CategoryData, setCategoryData] = useState('');
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
  const GetExamData = () => {
    axios
      .post(
        'https://elearning.tmgs.vn/api/v2/competition/list/all',
        {searchValue: searchValue, categoryId: CateId, typeMyCompetition: null},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
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
        setCateId('');
      });
  };
  const GetCategoryExam = () => {
    axios
      .get('https://elearning.tmgs.vn/api/v2/competition/categories/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCategoryData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        setCount(count + 1);
        console.log(error);
      })
      .finally(() => {
        console.log('cate');
      });
  };
  const getExams = async () => {
    await getToken();
    await GetExamData();
    await GetCategoryExam();
  };
  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  const clearInput = () => {
    setSearchValue('');
  };
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
            examPS: 'Bộ Giáo dục và Đào tạo',
          })
        }>
        {item.imageCompetition === null ? (
          <Image
            style={styles.imageNew}
            source={{
              uri:
                'https://elearning.tmgs.vn/static/images/default_thumb_exam.png',
            }}
          />
        ) : (
          <Image
            style={styles.imageNew}
            source={{
              uri: 'http://elearning.tmgs.vn' + item.imageCompetition,
            }}
          />
        )}
        <View style={styles.viewNew}>
          <Text style={styles.titleNew} numberOfLines={1}>
            {item.nameCompetition}
          </Text>
          <View style={styles.iconAndText}>
            <BuildingIcon color="#17a2b8" />
            <Text style={styles.authorText}>Bộ Giáo dục và Đào tạo</Text>
          </View>
          <View style={styles.iconAndText}>
            <ClockIcon clockheight={scale(18)} clockwidth={scale(16)} />
            <Text style={styles.timeText}>Không giới hạn thời gian</Text>
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
          setCount(count + 1);
          setModalVisible(false);
        }}>
        <Text style={styles.smallModalText}>{item.nameCompetition}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <MenuIcon height={30} width={30} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.SearchArea}>
          <View style={styles.SearchIconArea}>
            <TouchableOpacity
              onPress={() => {
                setCount(count + 1);
              }}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.TextInputArea}>
            <TextInput
              style={styles.inputText}
              placeholder={'Tìm cuộc thi'}
              value={searchValue}
              onChangeText={(input) => setSearchValue(input)}
            />
          </View>
          <View style={styles.CancelIconArea}>
            <TouchableOpacity
              onPress={() => {
                clearInput();
                setCount(count + 1);
              }}>
              <CancelIcon />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <BellIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{marginTop: scale(20)}}
        data={dataExam}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={newsID}
        refreshing={getting}
        onRefresh={() => getExams()}
      />
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
              data={CategoryData}
              renderItem={renderItem1}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>
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
  searchBar: {
    height: scale(56),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#144E8C',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(5),
    color: 'black',
  },
  SearchArea: {
    height: scale(36),
    width: '75%',
    backgroundColor: 'white',
    borderRadius: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchIconArea: {
    width: '10%',
    alignItems: 'center',
  },
  CancelIconArea: {
    width: '10%',
  },
  TextInputArea: {
    width: '80%',
    height: '100%',
  },
  inputText: {
    fontSize: scale(15),
  },
  smallCenteredView: {
    flex: 1,
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
    marginTop: scale(58),
    marginLeft: scale(20),
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
  itemCategory: {
    backgroundColor: '#f0f0f0',
    marginBottom: scale(10),
    paddingLeft: scale(5),
  },
});
