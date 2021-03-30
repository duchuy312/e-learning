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
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import HTML from 'react-native-render-html';

const VideoPlayer = () => {
  const route = useRoute();
  const [urlFile] = useState(route.params.urlFile);
  const [Content] = useState(route.params.content);
  //state
  const [link, setLink] = useState('');
  const [type, setType] = useState('');

  console.log('url', urlFile);

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
      case 'html':
      case '.mp4':
      case '.mp3': {
        setLink('http://elearning.tmgs.vn' + urlFile);
        console.log('stt', link);
        setType('video');
        break;
      }

      case 'pptx':
      case '.doc':
      case 'docx':
      case 'xlsx': {
        setLink('http://elearning.tmgs.vn' + urlFile);
        console.log('belo');
        setType('office');
        break;
      }

      default:
        Alert.alert('NUMBER NOT FOUND');
    }
  };

  useEffect(() => {
    urlFile !== undefined ? checkSwitch(urlFile) : null;
  }, []);
  const contentWidth = (useWindowDimensions().width * 90) / 100;
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
      {Content !== undefined ? (
        <ScrollView style={styles.scrollArea}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{route.params.name}</Text>
            <HTML
              defaultTextProps={styles.text}
              source={{
                html: Content.replace(
                  /src="/g,
                  'src="http://elearning.tmgs.vn',
                ),
              }}
              contentWidth={contentWidth}
              baseFontStyle={styles.text}
            />
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};
export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contentContainer: {
    marginLeft: scale(8),
    marginRight: scale(8),
    alignContent: 'center',
  },
  text: {
    fontSize: scale(14),
    marginLeft: scale(8),
    marginRight: scale(8),
    lineHeight: scale(20),
    textAlign: 'justify',
  },
  contentText: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  scrollArea: {
    flex: 1,
    alignContent: 'center',
  },
  imageContainer: {
    width: '98%',
    height: scale(180),
    alignSelf: 'center',
  },
});
