import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
export default function TestList({route}) {
  const navigation = useNavigation();
  const [getting, setGetting] = useState(false);
  const {idRoundR, tokenR} = route.params;
  const [dataRound, setDataRound] = useState([]);
  const getExamsRound = async () => {
    await axios
      .get(
        `http://elearning-uat.tmgs.vn/api/competition/${idRoundR}/roundTest/list`,
        {
          headers: {
            Authorization: `Bearer ${tokenR}`,
          },
        },
      )
      .then((response) => {
        setGetting(true);
        // console.log('ExamsRound', response);
        setDataRound(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        // console.log('finally');
        setGetting(false);
      });
  };
  useEffect(() => {
    getExamsRound();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(tokenR);
  // console.log(dataRound.nameRound);
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewExamRound}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TestBegin', {
              timeRoundB: item.timeRound,
              tokenB: tokenR,
              idRoundB: item.id,
            })
          }>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.imageRound}
              source={{
                uri:
                  'http://elearning-uat.tmgs.vn/static/images/default_thumb_exam.png',
              }}
            />
            <View style={styles.viewContent}>
              <Text style={styles.textTittle}>Tên: {item.nameRound}</Text>
              <View style={{flexDirection: 'row', paddingTop: scale(10)}}>
                <Image
                  style={{
                    width: scale(16),
                    height: scale(16),
                    marginLeft: scale(10),
                  }}
                  source={require('../../img/time.png')}
                />
                <Text style={{paddingLeft: scale(8)}}>
                  Thời gian làm bài: {item.timeRound / 60} phút
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'Tên cuộc thi'} />
      <FlatList
        data={dataRound}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={getting}
        onRefresh={() => getExamsRound()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
  },
  viewExamRound: {
    backgroundColor: '#FFF',
    marginTop: scale(10),
    marginLeft: scale(10),
    marginRight: scale(10),
    marginBottom: scale(5),
    height: scale(100),
    borderRadius: scale(5),
    // flexDirection: 'row',
  },
  textTittle: {
    color: 'black',
    fontSize: scale(15),
    marginLeft: scale(10),
  },
  imageRound: {
    borderRadius: scale(5),
    height: scale(100),
    width: scale(100),
  },
  viewContent: {
    alignSelf: 'center',
  },
});
