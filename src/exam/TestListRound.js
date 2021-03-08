import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import axios from 'axios';
export default function TestList({route}) {
  const [getting, setGetting] = useState(false);
  const {idRoundR, tokenR} = route.params;
  const [dataRound, setDataRound] = useState([]);
  const getExamsRound = async () => {
    await axios
      .get(
        `http://elearning-uat.vnpost.vn/api/competition/${idRoundR}/roundTest/list`,
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
        <Text style={styles.textTittle}>{item.nameRound}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Backbar title={'Tên cuộc thi'} />
      {/* <Text>{data.nameRound}</Text> */}
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
    // width: '100%',
    borderRadius: scale(5),
    // paddingLeft: scale(15),
    // paddingRight: scale(15),
  },
  textTittle: {
    color: 'blue',
    fontSize: scale(15),
  },
});
