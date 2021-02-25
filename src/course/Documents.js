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

export default function Documents({route}) {
  const [data, setData] = useState([]);
  const {courseID, token} = route.params;
  const [loading, setLoading] = useState(0);
  const [getting, setGetting] = useState(false);
  const [linkFile, setLinkFile] = useState('');

  // const startDownloading = () => {
  //   //path to download result
  //   const {
  //     fs: {dirs},
  //   } = RNFetchBlob;
  //   const PATH_TO_LIST = dirs.DocumentDir;
  //   const dest =
  //     'http://elearning-uat.vnpost.vn/e-learning/admin/download/document?name=ca88860f-d8b5-4929-a6d4-eb5a0ddf0fc6-NgonNguC-1-GioiThieuNgonNgu.mp4';

  //   //Creates a temp path if start downloading, you will save the data into temp path. After done, append data from temp path to your path
  //   const tmpPath = `${dest}.download`;
  //   //Check existing tmpPath in current your local saving
  //   RNFetchBlob.fs.ls(PATH_TO_LIST).then((files) => {
  //     console.log(files);
  //   });
  //   fs.exists(tmpPath)
  //     .then((ext) => {
  //       if (ext) {
  //         startTime = new Date().valueOf();
  //         return fs.stat(dest);
  //       }
  //       startTime = new Date().valueOf();
  //       return Promise.resolve({size: 0});
  //     })
  //     .then((stat) => {
  //       downtask = RNFetchBlob.config({
  //         path: tmpPath,
  //         fileCache: true,
  //       })
  //         .fetch('GET', url, {
  //           Range: `bytes=${stat.size}-`,
  //         })
  //         .progress((receivedStr, totalStr) => {
  //           // Do any things
  //         });
  //       this.downtask.catch(async (err) => {
  //         // Check error
  //         console.log(err);
  //       });
  //     })
  //     .then((file) => {
  //       if (Platform.OS === 'android') {
  //         return fs.appendFile(dest, file.path(), 'uri');
  //       }
  //     });
  // };

  const getDocuments = () => {
    axios
      .get(`http://elearning-uat.vnpost.vn/api/document/course/${courseID}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        //console.log(res.data.data[0].linkFile);
        setData(res.data.data);
        setGetting(true);
        // setLinkFile(res.data.data[0].linkFile);
        res.data.data.length === null ? setLoading(loading + 1) : null;
      })
      .catch((err) => {
        console.log('document', err);
        setLoading(loading + 1);
      })
      .finally(() => {
        setGetting(false);
      });
  };

  // const downFile = () => {
  //   RNFetchBlob.config({
  //     // add this option that makes response data to be stored as a file,
  //     // this is much more performant.
  //     fileCache: true,
  //   })
  //     .fetch('GET', linkFile, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       // the temp file path
  //       console.log('The file saved to ', res.path());
  //     });
  // };

  const renderItem = ({item}) => (
    <View style={styles.contaiDoc}>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity style={styles.btnDownload}>
        <Image
          source={require('../../img/software-download.jpg')}
          style={styles.imgDownload}
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (token.length > 0 && loading <= 15) {
      getDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={getting}
        onRefresh={() => getDocuments()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ddd'},
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
});
