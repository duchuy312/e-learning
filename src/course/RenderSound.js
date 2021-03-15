import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Video from 'react-native-video';

const RenderSound = ({route, navigation}) => {
  axiosRetry(axios, {retries: 15});
  const {url} = route.params;
  return (
    <View style={styles.container}>
      <Video
        source={{uri: url}} // Can be a URL or a local file.
        controls
        style={styles.video}
      />
    </View>
  );
};

export default RenderSound;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd', justifyContent: 'center'},
  video: {flex: 1},
});
