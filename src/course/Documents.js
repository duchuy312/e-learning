import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
//import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {scale} from 'react-native-size-matters';
import axiosRetry from 'axios-retry';

export default function Documents({route, navigation}) {
  axiosRetry(axios, {retries: 3});

  const [data, setData] = useState([]);
  const {courseID, token} = route.params;
  const [loading, setLoading] = useState(0);
  const [getting, setGetting] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function getDocuments() {
    axios
      .get(`http://elearning-uat.tmgs.vn/api/document/course/${courseID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        console.log('getdoc', res.data.data);
        setData(res.data.data);
        setGetting(true);
      })
      .catch((err) => {
        console.log('document', err);
        setLoading(loading + 1);
      })
      .finally(() => {
        setGetting(false);
      });
  }

  function chooseOpenEditor(url) {
    // console.log(url);
    const fileExtension = url.slice(-4);
    switch (fileExtension) {
      case 'pptx': {
        navigation.navigate('WebViewComponent', {url: url, type: 'doc'});
        break;
      }
      case '.pdf': {
        navigation.navigate('ReadPDF', {url: url});
        break;
      }
      case 'docx':
      case '.doc': {
        navigation.navigate('WebViewComponent', {url: url, type: 'doc'});
        break;
      }
      case 'xlsx': {
        navigation.navigate('WebViewComponent', {url: url, type: 'doc'});
        break;
      }
      case '.rar': {
        navigation.navigate('');
        break;
      }
      case '.mp3': {
        navigation.navigate('RenderSound', {url: url});
        break;
      }
      case '.mp4': {
        navigation.navigate('RenderSound', {url: url});
        break;
      }
      case '.png':
      case '.jpg': {
        navigation.navigate('WebViewComponent', {url: url, type: 'img'});
        break;
      }
    }
  }

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedId(item.id);
            chooseOpenEditor(item.rootLink);
          }}>
          <View style={styles.contaiDoc}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.btnDownload}>
              <Image
                source={require('../../img/software-download.jpg')}
                style={styles.imgDownload}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (token.length > 0) {
      getDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={styles.container}>
      {data.length === 0 && (
        <View style={styles.contaiNotification}>
          <Text style={styles.notificationTxt}>Không có tài liệu nào</Text>
        </View>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={getting}
        onRefresh={() => getDocuments()}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd'},
  webView: {width: '100%', height: scale(700)},
  contaiDoc: {
    height: scale(50),
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontWeight: '600',
    fontSize: scale(18),
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  btnDownload: {
    width: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(10),
  },
  imgDownload: {width: scale(20), height: scale(20)},
  notificationTxt: {color: 'red'},
  contaiNotification: {justifyContent: 'center', alignItems: 'center'},
});
