import React, {useState} from 'react';
import {Image, TextInput, View, Text} from 'react-native';
import styles from './Style';
const ViewBar = () => {
  const [key, onChangeKey] = useState();

  return (
    <View style={styles.viewBar}>
      <Image style={styles.imageMenu} source={require('../../img/menu.png')} />
      <View style={styles.searchContainer}>
        <Image
          style={styles.imageSearch}
          source={require('../../img/searchIcon.png')}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeKey(text)}
          value={key}
          placeholder={'Tìm kiếm'}
        />
        <Image
          style={styles.imageDelete}
          source={require('../../img/delete.png')}
        />
      </View>
      <Image style={styles.imageBell} source={require('../../img/bell.png')} />
    </View>
  );
};
export default ViewBar;
