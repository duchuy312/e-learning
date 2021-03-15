import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';
import {WebView} from 'react-native-webview';

const VideoPlayer = () => {
  const route = useRoute();
  const {urlFile} = route.params;
  //state
  const [link, setLink] = useState('');
  const [type, setType] = useState('');

  console.log('abc', urlFile);

  const checkSwitch = (url) => {
    console.log('anni');

    if (url.startsWith('https://www.youtube.com')) {
      // console.log('abitan');
      setLink(urlFile);
      setType('video');
      // console.log('tuna', link);
      return link;
    }

    const str = url.slice(-4);
    console.log(str);

    switch (str) {
      case '.mp4':
      case '.mp3': {
        setLink('http://elearning-uat.tmgs.vn' + urlFile);
        console.log('stt', link);
        setType('video');
        break;
      }

      case 'pptx':
      case '.doc':
      case 'docx':
      case 'xlsx': {
        setLink('http://elearning-uat.tmgs.vn' + urlFile);
        console.log('belo');
        setType('office');
        break;
      }

      default:
        Alert.alert('NUMBER NOT FOUND');
    }
  };

  useEffect(() => {
    checkSwitch(urlFile);
  }, []);

  return (
    <View style={styles.container}>
      {type === 'video' ? (
        <WebView
          style={{marginTop: Platform.OS == 'ios' ? 20 : 0}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: link,
          }}
        />
      ) : type === 'office' ? (
        <WebView
          allowsFullscreenVideo={true}
          source={{
            html:
              `<div style="height:95vh">
          <iframe width="100%" height="100%" src="https://view.officeapps.live.com/op/embed.aspx?src=` +
              link +
              ` "
          </iframe>
          </div>`,
          }}
          originWhitelist={'http: // *'}
          allowsBackForwardNavigationGestures={true}
          incognito={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          pullToRefreshEnabled={true}
          setSupportMultipleWindows={true}
          style={styles.webView}
        />
      ) : null}
      {/* <View style={styles.TitleContainer}>
        <Text style={styles.title}>{route.params.name}</Text>
      </View> */}
    </View>
  );
};
export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logocontainer: {
    height: scale(200),
    width: scale(350),
    justifyContent: 'center',
    alignItems: 'center',
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
