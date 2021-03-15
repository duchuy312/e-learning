import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Pdf from 'react-native-pdf';

const ReadPDF = ({route, navigation}) => {
  axiosRetry(axios, {retries: 15});
  const {url} = route.params;
  return (
    <View style={styles.container}>
      <Pdf source={{uri: url}} style={styles.pdf} />
    </View>
  );
};

export default ReadPDF;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd', justifyContent: 'center'},
  pdf: {flex: 1},
});
