import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {DownloadIcon} from '../../svg/icon';
import RNFetchBlob from 'rn-fetch-blob';

const Documents = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [dataDoc, setDataDoc] = useState([]);
  const [countDocs, setCountDocs] = useState(0);
  const DocID = useState('');
  const getDoc = async () => {
    await axios
      .get(
        `https://elearning.tmgs.vn/api/document/course/${route.params.CourseID}`,
        {
          headers: {
            Authorization: `Bearer ${route.params.CourseTK}`,
          },
        },
      )
      .then((response) => {
        setDataDoc(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [fileUrl, setFileUrl] = useState('');
  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };
  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.DocContainer}>
        <View style={styles.ContentContainer}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text>{item.originName}</Text>
          <Text>{item.sizes}</Text>
          <Text style={styles.timeText}>
            Phát hành: {new Date(item.timeCreate).toLocaleDateString('en-GB')}
          </Text>
        </View>
        <View style={styles.IconContainer}>
          <TouchableOpacity
            onPress={() => {
              checkPermission();
              setFileUrl(item.rootLink);
            }}>
            <DownloadIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {dataDoc.length === 0 ? (
        <View>
          <Text>Chưa có tài liệu cho khóa học</Text>
        </View>
      ) : (
        <FlatList
          data={dataDoc}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={DocID}
        />
      )}
    </View>
  );
};
export default Documents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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
  scrollArea: {
    flex: 1,
    alignContent: 'center',
  },
  scrollcontent: {
    alignContent: 'center',
    flex: 1,
  },
  DocContainer: {
    width: '100%',
    height: scale(90),
    borderBottomWidth: scale(1 / 2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  IconContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentContainer: {
    width: '85%',
    height: '100%',
    justifyContent: 'center',
  },
  timeText: {
    color: '#cecece',
  },
  titleText: {
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});
