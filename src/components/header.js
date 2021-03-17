import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {MenuIcon, SearchIcon, CloseIcon, BellIcon} from '../../svg/icon';

export function Header(props) {
  const [valueTextInput, setValueTextInput] = useState('');
  const {doST, iconSearch, textInputHolder} = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconMenu} onPress={() => doST()}>
        <MenuIcon style={styles.imgMenu} />
      </TouchableOpacity>
      <View style={styles.containerSearch}>
        <TouchableOpacity
          style={iconSearch}
          onPress={() => {
            props.getValueSearch(valueTextInput);
          }}>
          <SearchIcon style={styles.searchImg} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder={textInputHolder}
          value={valueTextInput}
          onChangeText={(t) => {
            setValueTextInput(t);
          }}
        />
        <TouchableOpacity
          style={styles.circleClose}
          onPress={() => {
            setValueTextInput('');
            props.getValueSearch('');
          }}>
          <CloseIcon style={styles.imgClose} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnBell}>
        <BellIcon style={styles.bellIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#144e8c',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMenu: {width: scale(20), height: scale(20)},
  iconMenu: {
    width: scale(20),
    height: scale(20),
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearch: {
    width: scale(250),
    height: scale(40),
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImg: {paddingHorizontal: scale(20)},
  textInput: {width: scale(170)},
  circleClose: {
    width: scale(17),
    height: scale(17),
    borderRadius: scale(9),
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    marginHorizontal: scale(10),
  },
  imgClose: {width: scale(6), height: scale(6)},
  btnBell: {marginHorizontal: scale(15)},
  bellIcon: {width: scale(20), height: scale(20)},
});
