import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';

const MainCourse = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [valueTextInput, setValueTextInput] = useState('');

  const doST = () => {
    setModalVisible(true);
  };

  const renderItem = () => {};

  return (
    <View style={styles.container}>
      <Header
        header={styles.header}
        styleButtonLeft={styles.iconMenu}
        doST={doST}
        styleImgLeft={styles.imgMenu}
        sourceImgLeft={require('../../img/menu.png')}
        searchBarStyle={styles.containerSearch}
        sourceIconSearch={require('../../img/searchIcon.png')}
        imgSearchStyle={styles.searchImg}
        iconSearch={styles.searchIcon}
        textInputStyle={styles.textInput}
        iconCloseStyle={styles.circleClose}
        sourceImgClose={require('../../img/close.png')}
        imgCloseStyle={styles.imgClose}
        styleButtonRight={styles.btnBell}
        styleImgRight={styles.bellIcon}
        sourceImgRight={require('../../img/bell.png')}
        textInputHolder="Tìm kiếm"
      />
      <View style={styles.body}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default MainCourse;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    backgroundColor: '#144e8c',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMenu: {width: scale(20), height: scale(20)},
  iconMenu: {
    width: scale(20),
    height: scale(20),
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    width: scale(250),
    height: scale(40),
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImg: {width: scale(20), height: scale(20)},
  textInput: {width: scale(180)},
  circleClose: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    marginHorizontal: scale(10),
  },
  imgClose: {width: scale(12), height: scale(12)},
  btnBell: {marginHorizontal: scale(15)},
  bellIcon: {width: scale(20), height: scale(20)},
  /*------------------- */
  body: {flex: 9},
  list: {flex: 1, marginTop: scale(20)},
  contaiView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: scale(10),
    marginLeft: scale(10),
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  image: {
    width: scale(120),
    height: scale(120),
    margin: scale(5),
    borderRadius: 60,
    flex: 1,
  },
  content: {flex: 2},
  titleContent: {fontWeight: 'bold', fontSize: 15, width: '100%'},
  time: {marginHorizontal: 2, flexDirection: 'row'},
  clockIcon: {width: scale(20), height: scale(20), marginRight: scale(5)},
  line: {flexDirection: 'row', alignItems: 'center'},
  backLine: {
    width: scale(100),
    height: scale(5),
    backgroundColor: '#ddd',
    marginTop: scale(5),
    marginRight: scale(5),
  },
  frontLine: {width: scale(70), height: scale(5), backgroundColor: 'orange'},
  txtLine: {color: 'orange'},
  starLine: {flexDirection: 'row'},
  star: {width: scale(15), height: scale(15)},
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: scale(500),
    width: '100%',
  },
  modalView: {
    width: '100%',
    height: scale(300),
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
  },
  categoryMain: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginLeft: scale(50),
  },
  category: {alignContent: 'center', marginLeft: scale(100)},
  btnDown: {width: scale(15), height: scale(15)},
  txtCat: {marginRight: scale(50)},
});
