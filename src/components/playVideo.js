import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

export default function PlayVideo(props) {
  const {url, stylesImgBlack} = props;
  console.log(url);

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer?.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    setPlayerState(PLAYER_STATES.PLAYING);
    setPaused(false);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  // const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={{flex: 1}}>
      <Video
        onEnd={() => onEnd}
        onLoad={() => onLoad}
        onLoadStart={() => onLoadStart}
        onProgress={() => onProgress}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri: url,
        }}
        style={stylesImgBlack}
        volume={10}
      />
      <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={() => onFullScreen}
        onPaused={() => onPaused}
        onReplay={() => onReplay}
        onSeek={() => onSeek}
        onSeeking={() => onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={() => renderToolbar()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
