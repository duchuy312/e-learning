import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';
import StarRating from '../components/Star';

const Menu = ({navigation, route}) => {
  const getData = () => {};
  const [data, setData] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đề cương</Text>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd'},
  title: {alignItems: 'center'},
});
