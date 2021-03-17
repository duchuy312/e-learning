import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {WebView} from 'react-native-webview';

const WebViewComponent = ({route, navigation}) => {
  const {url, type} = route.params;
  return (
    <View style={styles.container}>
      {type === 'doc' ? (
        <WebView
          allowsFullscreenVideo={true}
          source={{
            html:
              `<div style="height:95vh">
            <iframe 
            src='https://view.officeapps.live.com/op/embed.aspx?src=` +
              url +
              `'
            width='100%' 
            height='100%' 
            frameborder='0'>
            </iframe>
            </div>`,
          }}
          pullToRefreshEnabled={true}
          originWhitelist={'http: // *'}
          allowsBackForwardNavigationGestures={true}
          incognito={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          setSupportMultipleWindows={true}
          style={styles.webView}
        />
      ) : type === 'youtube' ? (
        <View style={{flex: 1}}>
          <WebView
            style={{marginTop: Platform.OS == 'ios' ? 20 : 0}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{
              uri: url,
            }}
          />
        </View>
      ) : (
        <WebView source={{uri: url}} />
      )}
    </View>
  );
};

export default WebViewComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    width: '100%',
    height: '100%',
  },
  webView: {flex: 1, width: '100%', height: '100%'},
});
