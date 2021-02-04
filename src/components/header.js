import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';

export function Header(props) {
  const [valueTextInput, setValueTextInput] = useState('');
  const {
    header,
    styleButtonLeft,
    styleImgLeft,
    sourceImgLeft,
    styleButtonRight,
    styleText,
    searchBarStyle,
    sourceIconSearch,
    imgSearchStyle,
    textInputStyle,
    iconCloseStyle,
    sourceImgClose,
    imgCloseStyle,
    text,
    midTextStyle,
    styleImgRight,
    sourceImgRight,
    doST,
    iconSearch,
    title,
    styleTitle,
    textInputHolder,
  } = props;
  return (
    <View style={header}>
      <TouchableOpacity style={styleButtonLeft} onPress={() => doST()}>
        <Image style={styleImgLeft} source={sourceImgLeft} />
      </TouchableOpacity>
      <Text style={styleTitle}>{title}</Text>
      <View style={searchBarStyle}>
        <TouchableOpacity style={iconSearch}>
          <Image source={sourceIconSearch} style={imgSearchStyle} />
        </TouchableOpacity>
        <TextInput
          style={textInputStyle}
          placeholder={textInputHolder}
          value={valueTextInput}
          onChangeText={(t) => {
            setValueTextInput(t);
          }}
        />
        <TouchableOpacity style={iconCloseStyle}>
          <Image source={sourceImgClose} style={imgCloseStyle} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styleButtonRight}>
        <Image style={styleImgRight} source={sourceImgRight} />
      </TouchableOpacity>
    </View>
  );
}
