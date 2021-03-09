import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const route = useRoute();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const noop = () => {};
  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };
  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);
  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };
  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };
  console.log(route.params.urlFile);
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <Video
          onEnd={() => onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          posterResizeMode={'cover'}
          onProgress={onProgress}
          paused={paused}
          ref={(ref) => (videoPlayer.current = ref)}
          resizeMode={'cover'}
          source={{
            uri: `http://elearning-uat.tmgs.vn/${route.params.urlFile}`,
          }}
          style={styles.backgroundVideo}
        />
        <MediaControls
          isFullScreen={isFullScreen}
          onFullScreen={noop}
          duration={duration}
          isLoading={isLoading}
          progress={currentTime}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          mainColor={'red'}
          playerState={playerState}
          sliderStyle={{containerStyle: {}, thumbStyle: {}, trackStyle: {}}}
        />
      </View>
      <View style={styles.TitleContainer}>
        <Text style={styles.title}>{route.params.name}</Text>
      </View>
    </View>
  );
};
export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logocontainer: {
    height: scale(200),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(1 / 4),
  },
  imageNew: {
    flex: 1,
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
  },
  WareContainer: {
    width: '100%',
    height: scale(100),
    borderBottomWidth: scale(1 / 2),
    flexDirection: 'row',
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  TitleContainer: {
    width: '96%',
    marginTop: scale(20),
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
});
