import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import {useNavigation, useRoute} from '@react-navigation/native';

const UserInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Backbar title={'Thông tin cá nhân'} />
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
      <View style={styles.line} />
      <View style={styles.InforContainer}>
        <View style={styles.LeftTable}>
          <Text style={styles.textLeft}>Họ Tên</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Email</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Ngày Sinh</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Địa Chỉ</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Số Điện Thoại</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Đơn Vị</Text>
          <View style={styles.leftLine} />
          <Text style={styles.textLeft}>Giới Tính</Text>
          <View style={styles.leftLine} />
        </View>
        <View style={styles.RightTable}>
          <Text style={styles.textLeft}>{route.params.name}</Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>{route.params.email}</Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>
            {new Date(route.params.birth).toLocaleDateString('en-GB')}
          </Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>{route.params.place}</Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>{route.params.phone}</Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>{route.params.company}</Text>
          <View style={styles.rightLine} />
          <Text style={styles.textLeft}>
            {route.params.gender === 1 ? 'Nam' : 'Nữ'}
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <TouchableOpacity
        style={styles.button1}
        onPress={() =>
          navigation.navigate('EditProfile', {
            avatar: route.params.avatar,
            name: route.params.name,
            phone: route.params.phone,
            email: route.params.email,
            gender: route.params.gender,
            place: route.params.place,
            birth: route.params.birth,
            UserToken: route.params.UserTK,
          })
        }>
        <Text style={styles.Button1Text}>Cập nhật thông tin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: scale(30),
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
    marginBottom: scale(30),
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
  LeftTable: {
    width: '30%',
    marginLeft: scale(10),
  },
  RightTable: {
    width: '70%',
  },
  InforContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  textLeft: {
    fontSize: scale(15),
    marginVertical: scale(10),
  },
  leftLine: {
    width: '100%',
    height: scale(1 / 2),
  },
  rightLine: {
    width: '90%',
    height: scale(1 / 2),
    backgroundColor: 'black',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
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
});
