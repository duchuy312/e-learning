import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date(route.params.birth));
  const [birthday, setBirthday] = useState(route.params.birth);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(route.params.gender);
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [name, setName] = useState(route.params.name);
  const [avatar, setAvatar] = useState(route.params.avatar);
  const [place, setPlace] = useState(route.params.place);
  console.log(gender);
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
  const onChange = async (event, selectedDate) => {
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <Backbar title={'Thông tin cá nhân'} />
        <View style={styles.Avatar}>
          <ImageBackground
            blurRadius={2}
            style={styles.bigAvatar}
            source={{
              uri: 'http://elearning-uat.vnpost.vn' + route.params.avatar,
            }}>
            <View style={styles.avatarContainer}>
              <View style={styles.circle}>
                <Image
                  style={styles.logo}
                  source={{
                    uri: 'http://elearning-uat.vnpost.vn' + route.params.avatar,
                  }}
                />
              </View>
            </View>
            <View style={styles.nameInput}>
              <TextInput
                value={name}
                onChangeText={(nameinput) => setName(nameinput)}
                placeholderTextColor={'#cecece'}
                placeholder={name}
                style={styles.inputText}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.InforContainer}>
          <View style={styles.EmailInput}>
            <Text style={styles.title}>E-mail</Text>
            <View style={styles.emailBox}>
              <TextInput
                value={email}
                onChangeText={(emailinput) => setEmail(emailinput)}
                placeholder={email}
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.EmailInput}>
            <Text style={styles.title}>Phone</Text>
            <View style={styles.emailBox}>
              <TextInput
                value={phone}
                onChangeText={(phoneinput) => setPhone(phoneinput)}
                placeholder={phone}
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.EmailInput}>
            <Text style={styles.title}>City</Text>
            <View style={styles.emailBox}>
              <TextInput
                value={place}
                onChangeText={(placeinput) => setPlace(placeinput)}
                placeholder={place}
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={styles.TwoInforContainer}>
            <View style={styles.DateInput}>
              <Text style={styles.title}>BirthDay</Text>
              <TouchableOpacity
                style={styles.DateBox}
                onPress={() => showDatepicker()}>
                <Text style={styles.textInput}>
                  {new Date(birthday).toLocaleString('en-GB').substring(0, 10)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.GenderInput}>
              <Text style={styles.title}>Gender</Text>
              <View style={styles.GenderBox}>
                <Picker
                  itemStyle={styles.textInput}
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.GenderChoice}>
                  <Picker.Item label="-" value="3" />
                  <Picker.Item label="Nam" value="1" />
                  <Picker.Item label="Nữ" value="0" />
                </Picker>
              </View>
            </View>
          </View>
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
        <TouchableOpacity
          style={styles.button1}
          onPress={() => sendUpdateData()}>
          <Text style={styles.Button1Text}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  Scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Avatar: {
    height: scale(220),
    width: '150%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatar: {
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: scale(40),
    height: scale(120),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: scale(1),
    elevation: scale(5),
    borderRadius: scale(60),
    overflow: 'hidden',
    borderColor: 'white',
  },
  circle: {
    height: scale(120),
    width: scale(120),
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  button1: {
    marginTop: scale(20),
    width: scale(290),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#FCB71E',
  },
  Button1Text: {
    fontSize: scale(18),
    color: '#FCB71E',
  },
  nameInput: {
    marginTop: scale(10),
    justifyContent: 'flex-end',
    width: '50%',
    height: scale(40),
    alignItems: 'center',
    borderBottomWidth: scale(1 / 2),
    borderColor: 'white',
  },
  inputText: {
    color: 'white',
    fontSize: scale(18),
    height: '100%',
    width: '98%',
  },
  InforContainer: {
    width: '90%',
    height: scale(300),
    marginTop: scale(20),
  },
  title: {
    color: '#cecece',
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  EmailInput: {
    height: scale(70),
    justifyContent: 'space-between',
  },
  emailBox: {
    height: scale(40),
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
  },
  textInput: {
    fontSize: scale(16),
  },
  DateInput: {
    height: scale(70),
    justifyContent: 'space-between',
    width: '50%',
  },
  GenderInput: {
    height: scale(70),
    marginLeft: scale(30),
    width: '50%',
    justifyContent: 'space-between',
  },
  DateBox: {
    height: scale(40),
    width: '100%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderBox: {
    height: scale(40),
    width: '80%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderChoice: {
    height: scale(50),
    width: scale(120),
    fontSize: scale(100),
  },
  TwoInforContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
});
