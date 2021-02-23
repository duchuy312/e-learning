/* eslint-disable no-lone-blocks */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';

export default function RegisterCourse({navigation}) {
  const [byCode, setByCode] = useState(false);
  const [byAccept, setByAccept] = useState(false);
  const [value, onChangeText] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisibleR, setModalVisibleR] = useState(false);

  const pressByCode = () => {
    setByCode(true);
    setByAccept(false);
  };

  const pressByAccept = () => {
    setByCode(false);
    setByAccept(true);
  };

  const doST = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {
        //   <Header
        //     header={styles.header}
        //     styleButtonLeft={styles.btnback}
        //     styleImgLeft={styles.imgBack}
        //     doST={doST}
        //     title="Chi tiết khóa học"
        //     styleTitle={styles.titleHeader}
        //     sourceImgLeft={require('../../img/Back.png')}
        //   />
        //   <View style={styles.body}>
        //     <Text style={styles.bold}>{'Chọn phương thức đăng kí học'}</Text>
        //     <View style={styles.inline}>
        //       <TouchableOpacity
        //         style={styles.bigCircle}
        //         onPress={() => pressByCode()}>
        //         {byCode === true && <View style={styles.smallCircle} />}
        //       </TouchableOpacity>
        //       <Text>{'Đăng kí bằng mã code'}</Text>
        //     </View>
        //     <View style={styles.inline}>
        //       <TouchableOpacity
        //         style={styles.bigCircle}
        //         onPress={() => pressByAccept()}>
        //         {byAccept === true && <View style={styles.smallCircle} />}
        //       </TouchableOpacity>
        //       <Text>{'Đăng kí chờ phê duyệt'}</Text>
        //     </View>
        //     {/**-----------Check radio button -----------*/}
        //     {byCode === true ? (
        //       <View>
        //         <Modal
        //           animationType="slide"
        //           transparent={true}
        //           visible={modalVisible}>
        //           <View style={styles.centeredView}>
        //             <View style={styles.modalView}>
        //               <TouchableOpacity
        //                 style={styles.btnClose}
        //                 onPress={() => {
        //                   setModalVisible(false);
        //                 }}>
        //                 <Image
        //                   source={require('../../img/close.png')}
        //                   style={styles.imgClose}
        //                 />
        //               </TouchableOpacity>
        //               <Text style={styles.titleModal}>{'Mã code của bạn là:'}</Text>
        //               <Text>{'123456'}</Text>
        //             </View>
        //           </View>
        //         </Modal>
        //         <TextInput
        //           style={styles.textInput}
        //           onChangeText={(t) => onChangeText(t)}
        //           value={value}
        //           placeholder="Nhập mã lớp học"
        //           keyboardType="numeric"
        //         />
        //         <TouchableOpacity
        //           style={styles.requestedBtn}
        //           onPress={() => {
        //             navigation.navigate('MiddleStartCourse');
        //           }}>
        //           <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
        //         </TouchableOpacity>
        //       </View>
        //     ) : byAccept === true ? (
        //       <View>
        //         <TouchableOpacity
        //           style={styles.requestedBtn}
        //           onPress={() => {
        //             setModalVisibleR(true);
        //           }}>
        //           <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
        //         </TouchableOpacity>
        //         <Modal
        //           animationType="slide"
        //           transparent={true}
        //           visible={modalVisibleR}>
        //           <View style={styles.modalOver}>
        //             <View style={styles.modalContai}>
        //               <TouchableOpacity style={styles.btnClose} onPress={() => {}}>
        //                 <Image
        //                   source={require('../../img/close.png')}
        //                   style={styles.imgClose}
        //                 />
        //               </TouchableOpacity>
        //               <View style={styles.circleTick}>
        //                 <Image
        //                   source={require('../../img/Tick.png')}
        //                   style={styles.imgTick}
        //                 />
        //               </View>
        //               <Text>{'Gửi đăng kí thành công'}</Text>
        //               <Text>{'Hãy chờ được phê duyệt để vào học'}</Text>
        //             </View>
        //           </View>
        //         </Modal>
        //       </View>
        //     ) : (
        //       <TouchableOpacity style={styles.requestBtn}>
        //         <Text style={styles.txtRequest}>{'Gửi yêu cầu'}</Text>
        //       </TouchableOpacity>
        //     )}
        //   </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  /**---------------Header------------------ */
  header: {
    flex: 1,
    backgroundColor: '#144E8C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnback: {
    width: scale(15),
    height: scale(15),
    position: 'absolute',
    left: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {width: scale(15), height: scale(15)},
  titleHeader: {color: '#fff', fontSize: scale(18)},
  /**---------------Body------------------ */
  body: {
    flex: 9,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {fontWeight: 'bold', fontSize: 20},
  inline: {flexDirection: 'row', marginVertical: 10},
  bigCircle: {
    borderWidth: 1,
    borderColor: '#144e8c',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  smallCircle: {
    backgroundColor: '#144e8c',
    width: 15,
    height: 15,
    borderRadius: 8,
  },
  requestBtn: {
    backgroundColor: '#aaa',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestedBtn: {
    backgroundColor: 'orange',
    width: 200,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRequest: {color: '#fff'},
  textInput: {
    width: 200,
    height: 40,
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#bbb',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //----------------set Modal khi chon dang ki bang ma code-----------------
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: '#aaa',
  },
  modalView: {
    margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(200),
    height: scale(200),
  },
  btnClose: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  imgClose: {width: scale(10), height: scale(10)},
  titleModal: {fontWeight: 'bold', fontSize: scale(15), marginTop: scale(5)},
  //----------------set Modal khi chon dang ki bang phe duyet-----------------
  modalOver: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
    backgroundColor: '#aaa',
  },
  modalContai: {
    margin: scale(10),
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(8),
    alignItems: 'center',
    width: scale(250),
    height: scale(250),
  },
  circleTick: {
    marginTop: scale(40),
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: scale(50),
  },
  imgTick: {width: scale(70), height: scale(70)},
});
