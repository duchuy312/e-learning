/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Backbar} from '../components/BackBar';
import {CalendarIcon} from '../../svg/icon';

const UserInfor = ({navigation, route}) => {
  const {token} = route.params;

  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [phoneN, setPhoneN] = useState(0);
  const [sw, setSW] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState(0);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [userID, setUserID] = useState('');
  //check gender register by code or by accept
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const pressMale = () => {
    setMale(true);
    setFemale(false);
  };

  const pressFemale = () => {
    setMale(false);
    setFemale(true);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@UserID', userID);
    } catch (e) {
      // saving error
    }
  };

  function postInfor() {
    axios.post('http://elearning-uat.tmgs.vn/api/profile/update', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getUserInfor() {
    axios
      .get('http://elearning-uat.tmgs.vn/api/profile/detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
        setUserID(res.data.data.id);
        setFullName(res.data.data.fullName);
        setEmail(res.data.data.email);
        setDate(
          new Date(res.data.data.birthDateFomatted)
            .toLocaleString()
            .slice(0, 8),
        );
        setAddress(res.data.data.place);
        setPhoneN(res.data.data.phoneNumber);
        setUserName(res.data.data.username);
        setSW(res.data.data.poscodeName);
        setGender(res.data.data.gender);
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getUserInfor();
      storeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //-------------set event for date picker--------------------------------
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <Backbar title={'Thông tin cá nhân'} />

      <ScrollView style={styles.body}>
        <View style={{alignItems: 'center', marginVertical: scale(15)}}>
          <Image source={require('../../img/image28.png')} style={styles.img} />
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Họ và tên</Text>
          <TextInput
            style={styles.txtInput}
            value={fullName}
            onChangeText={(t) => setFullName(t)}
          />
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Đơn vị</Text>
          <Text style={styles.txtInputS}>{sw}</Text>
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Chức danh công việc</Text>
          <View style={styles.txtInputS} />
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Tên đăng nhập</Text>
          <Text style={styles.txtInputS}>
            {userName !== '' ? userName : ''}
          </Text>
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Email</Text>
          <TextInput
            style={styles.txtInput}
            value={email}
            onChangeText={(t) => setEmail(t)}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.txt}>Ngày sinh</Text>
          <View style={styles.txtInput}>
            <Text>{date !== '' ? date : ''}</Text>
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={() => setShow(true)}>
              <CalendarIcon />
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Giới tính</Text>
          {gender === 1 ? setMale(true) : setFemale(true)}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: scale(10),
            }}>
            <TouchableOpacity
              style={styles.bigCircle}
              onPress={() => pressMale()}>
              {male === true && <View style={styles.smallCircle} />}
            </TouchableOpacity>
            <Text style={{marginRight: scale(5)}}>{'Nam'}</Text>
            <TouchableOpacity
              style={styles.bigCircle}
              onPress={() => pressFemale()}>
              {female === true && <View style={styles.smallCircle} />}
            </TouchableOpacity>
            <Text>{'Nữ'}</Text>
          </View>
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Địa chỉ</Text>
          <TextInput
            style={styles.txtInput}
            value={address}
            onChangeText={(t) => setAddress(t)}
          />
        </View>

        <View style={styles.inline}>
          <Text style={styles.txt}>Số điện thoại</Text>
          <TextInput
            style={styles.txtInput}
            value={phoneN}
            onChangeText={(t) => setPhoneN(t)}
          />
        </View>
      </ScrollView>
      <View style={styles.viewBtn}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            postInfor();
          }}>
          <Text style={{color: '#fff'}}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfor;

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {flex: 9, marginHorizontal: scale(30)},
  img: {width: scale(160), height: scale(160), borderRadius: scale(80)},
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  txtInput: {
    borderWidth: scale(1),
    width: scale(200),
    height: scale(40),
    marginLeft: scale(10),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {fontSize: scale(15), width: scale(70), fontWeight: 'bold'},
  txtInputS: {
    borderWidth: scale(1),
    width: scale(200),
    height: scale(40),
    marginLeft: scale(10),
    backgroundColor: '#ddd',
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
  },
  btn: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(5),
  },
  calendarIcon: {
    position: 'absolute',
    right: scale(10),
  },
  contaiTI: {justifyContent: 'center', alignItems: 'center'},
  bigCircle: {
    borderWidth: 1,
    borderColor: '#144e8c',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  smallCircle: {
    backgroundColor: '#144e8c',
    width: 15,
    height: 15,
    borderRadius: 8,
  },
});
