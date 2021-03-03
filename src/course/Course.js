/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import HTML from 'react-native-render-html';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

import {PlayVideo} from './PlayVideo';
import {Backbar} from '../components/BackBar';

export default function Course({navigation, route}) {
  axiosRetry(axios, {retries: 3});

  const {courseID, token, courseName} = route.params;
  //data for flatlist
  const [DATA, setData] = useState([]);
  //url of video
  const [url, setUrl] = useState('');
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const renderItem = ({item}) => (
    <View style={styles.titleChapter}>
      {item.status === 1 ? (
        <TouchableOpacity
          style={styles.titleChapter}
          onPress={() => {
            setUrl(
              `http://elearning-uat.vnpost.vn${item.chapterCourseWares[0].courseWare.files}`,
            );
          }}>
          <Text style={styles.txtTitle}>
            <HTML
              source={{
                html:
                  item.name + item.chapterCourseWares[0].courseWare.description,
              }}
            />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.titleChapter}
          onPress={() => {
            setUrl('');
          }}>
          <Text
            style={styles.txtTitle}>{`${item.name}: Chưa có tài liệu`}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.line} />
    </View>
  );

  function getChapLesson() {
    axios
      .get(
        `http://elearning-uat.vnpost.vn/api/course-ware/course/${courseID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
        // console.log(DATA);
      });
  }

  useEffect(() => {
    if (token.length > 0) {
      getChapLesson();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //----------------------<PlayVideo url={url} stylesImgBlack={styles.imgBlack} />
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
  return (
    <View style={styles.container}>
      <Backbar title={courseName} />
      {DATA.length !== [] && (
        <View>
          {url !== '' ? (
            <Video
              controls
              onEnd={() => onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              posterResizeMode={'cover'}
              onProgress={onProgress}
              paused={true}
              ref={(ref) => (videoPlayer.current = ref)}
              resizeMode={'cover'}
              source={{
                uri: url,
              }}
              style={styles.backgroundVideo}
            />
          ) : (
            <View style={styles.imgBlack} />
          )}
          <View style={styles.menu}>
            <FlatList
              style={styles.FlatList}
              data={DATA}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            <View style={styles.btn}>
              <TouchableOpacity style={styles.btnExamination}>
                <Text>{'Thi cuối khóa'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
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
    width: '100%',
    height: scale(200),
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgBlack: {
    width: '100%',
    height: scale(200),
    backgroundColor: '#000',
    position: 'absolute',
    left: scale(0),
    right: scale(0),
    top: scale(0),
  },
  items: {
    padding: scale(10),
    justifyContent: 'center',
    width: '100%',
    height: scale(50),
  },
  btn: {justifyContent: 'center', alignItems: 'center'},
  btnExamination: {
    width: scale(200),
    height: scale(50),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    margin: scale(10),
  },
  titleChapter: {
    marginTop: scale(5),
    marginLeft: scale(10),
    justifyContent: 'center',
    width: '100%',
    height: scale(50),
  },
  txtTitle: {
    color: '#000',
    width: scale(380),
    flexDirection: 'row',
  },
  titleLesson: {
    justifyContent: 'center',
    marginLeft: scale(20),
    width: scale(300),
    height: scale(40),
  },
  txtLesson: {color: '#000'},
  line: {width: '100%', height: scale(1), backgroundColor: '#aaa'},
  FlatList: {
    padding: scale(10),
    width: '100%',
  },
  txtLessonC: {color: '#144E8C'},
  video: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  videoBTN: {
    position: 'absolute',
    top: scale(0),
    right: scale(0),
    bottom: scale(0),
    left: scale(0),
  },
  menu: {
    flex: 3,
    position: 'absolute',
    top: scale(270),
    marginHorizontal: scale(0),
    width: '100%',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
});
