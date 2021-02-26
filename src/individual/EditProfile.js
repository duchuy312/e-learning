/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Platform,
} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import {scale} from 'react-native-size-matters';
import {RadioButton} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date(route.params.birth));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState(route.params.birth);
  const [gender, setGender] = useState(route.params.gender);
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [name, setName] = useState(route.params.name);
  const [avatar, setAvatar] = useState(route.params.avatar);
  const [place, setPlace] = useState(route.params.place);
  const [company, setCompany] = useState(route.params.company);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');

  const sendUpdateData = async () => {
    await axios
      .post(
        'http://elearning-uat.vnpost.vn/api/profile/update',
        {
          email: email,
          place: place,
          phoneNumber: phone,
          fullName: name,
          gender: gender,
          imageUsers: avatar,
          birthday: birthday,
          company: company,
        },
        {
          headers: {
            Authorization: `Bearer ${route.params.UserToken}`,
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
  useEffect(() => {
    setBirthday(date.getTime());
  }, [date]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text1}>Cập nhật thông tin cá nhân</Text>
        <TextField
          containerStyle={styles.textInput}
          label="Họ và tên"
          value={name}
          onChangeText={(nameinput) => {
            setName(nameinput);
          }}
        />
        {/* <TextField
          containerStyle={styles.textInput}
          label="Đơn vị"
          value={company}
          onChangeText={(text) => {
            setCompany(text);
          }}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Chức danh công việc"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        /> */}
        {/* <TextField
          containerStyle={styles.textInput}
          label="Tên đăng nhập"
          value={UserToken}
          onChangeText={(text) => {
            setUserToken(text);
          }}
        /> */}
        <TextField
          containerStyle={styles.textInput}
          label="Email"
          value={email}
          onChangeText={(emailinput) => {
            setEmail(emailinput);
          }}
        />

        <View style={styles.DateInput}>
          <Text style={styles.text2}>Ngày sinh</Text>
          <TouchableOpacity
            style={styles.DateBox}
            onPress={() => showDatepicker()}>
            <Text style={styles.input}>
              {new Date(birthday)
                .toLocaleString('en-GB')
                .replace(', 08:00:00', '')}
            </Text>
          </TouchableOpacity>
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
        <Text style={styles.rightLine}></Text>
        <Text style={styles.text3}>Giới tính</Text>
        <RadioButton.Group
          value={gender}
          onValueChange={(genderinput) => setGender(genderinput)}>
          <View style={{flexDirection: 'row', marginLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text>Nam</Text>
              <RadioButton value="1" />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>Nữ</Text>
              <RadioButton value="0" />
            </View>
          </View>
        </RadioButton.Group>

        <TextField
          containerStyle={styles.textInput}
          label="Địa chỉ"
          value={place}
          onChangeText={(placeinput) => {
            setPlace(placeinput);
          }}
        />
        <TextField
          containerStyle={styles.textInput}
          label="Số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(phoneinput) => {
            setPhone(phoneinput);
          }}
        />
        <TouchableOpacity
          style={styles.button3}
          onPress={() => sendUpdateData()}>
          <Text style={styles.linktext}>Cập nhật</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {flex: 1},
  textInput: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  linktext: {
    fontSize: scale(18),
    color: 'orange',
  },
  button3: {
    backgroundColor: '#E5E5E5',
    marginTop: 10,
    width: scale(200),
    height: scale(40),
    alignSelf: 'center',
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: '#FCB71E',
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  rightLine: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(1 / 2),
    backgroundColor: 'black',
  },
  text1: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'red',
  },
  text2: {
    marginTop: 10,
    fontSize: 16,
    color: '#a9a9a9',
  },
  text3: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 16,
    color: '#a9a9a9',
  },
  DateInput: {
    marginLeft: 20,
    height: scale(70),
    justifyContent: 'space-between',
    width: '50%',
  },
  title: {
    color: '#cecece',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  DateBox: {
    height: scale(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: scale(16),
  },
});
