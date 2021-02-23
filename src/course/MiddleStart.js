import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';

const MiddleStartCourse = ({navigation}) => {
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
        //     title="Khóa học phát triển kĩ năng"
        //     styleTitle={styles.titleHeader}
        //     sourceImgLeft={require('../../img/Back.png')}
        //   />
        //   <View style={styles.body}>
        //     <View style={styles.btnLine}>
        //       <TouchableOpacity style={styles.button}>
        //         <Text style={styles.txtButton}>{'Nội dung'}</Text>
        //       </TouchableOpacity>
        //       <TouchableOpacity style={styles.button}>
        //         <Text>{'Tài liệu'}</Text>
        //       </TouchableOpacity>
        //       <TouchableOpacity style={styles.button}>
        //         <Text>{'Thảo luận'}</Text>
        //       </TouchableOpacity>
        //     </View>
        //     <Image source={require('../../img/image15.png')} style={styles.img} />
        //     <View style={styles.content}>
        //       <Text style={styles.title}>{'Khóa học phát triển hệ thống'}</Text>
        //       <Text>{'Giảng viên: Nguyễn Bích Ngọc'}</Text>
        //       <View style={styles.inLine}>
        //         <View style={styles.process}>
        //           <View style={styles.inProcess} />
        //         </View>
        //         <Text style={styles.txtPercent}>{'70%'}</Text>
        //       </View>
        //       <View style={styles.inLine}>
        //         <Image
        //           style={styles.starIcon}
        //           source={require('../../img/Star.png')}
        //         />
        //         <Image
        //           style={styles.starIcon}
        //           source={require('../../img/Star.png')}
        //         />
        //         <Image
        //           style={styles.starIcon}
        //           source={require('../../img/Star.png')}
        //         />
        //         <Image
        //           style={styles.starIcon}
        //           source={require('../../img/nonStar.png')}
        //         />
        //         <Image
        //           style={styles.starIcon}
        //           source={require('../../img/nonStar.png')}
        //         />
        //       </View>
        //       <Text style={styles.blurText}>{'Số lượng học viên: 90'}</Text>
        //       <View style={styles.inLine}>
        //         <Text style={styles.blurText}>{'Bắt đầu: 28/12/2021'}</Text>
        //         <Text style={styles.blurText}>{'Kết thúc: 28/12/2021'}</Text>
        //       </View>
        //       <Text style={styles.normalText}>
        //         {
        //           'Sợ nói sai chính là nỗi sợ thường gặp nhất của người Việt khi học Tiếng Anh. Từ việc sợ bị chê cười vì nói sai sẽ dẫn đến việc ngại nói , lâu ngày người học sẽ bị cứng miệng - tức là dù nghe hiểu nhưng không hiểu nói sao.... '
        //         }
        //         <Text style={styles.link}>{'Xem thêm'}</Text>
        //       </Text>
        //       <View style={styles.overBtn}>
        //         <TouchableOpacity
        //           style={styles.buttonDK}
        //           onPress={() => {
        //             navigation.navigate('Course');
        //           }}>
        //           <Text style={styles.txtBtnDK}>{'Vào học ngay'}</Text>
        //         </TouchableOpacity>
        //       </View>
        //       <Text style={styles.normalText}>
        //         {'- Chương 2:Đào tạo phát triển kĩ năng cho nhân viên'}
        //       </Text>
        //       <Text style={styles.normalText}>
        //         {'- Chương 3:Xây dựng, phát triển nhân sự '}
        //       </Text>
        //     </View>
        //   </View>
      }
    </View>
  );
};
export default MiddleStartCourse;

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
  body: {flex: 9},
  btnLine: {flexDirection: 'row', justifyContent: 'space-around'},
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {color: '#144e8c', fontSize: 14},
  img: {width: '100%', height: 200, marginTop: 10, borderRadius: 20},
  content: {marginHorizontal: 20},
  title: {fontWeight: 'bold'},
  process: {
    width: 100,
    height: 5,
    backgroundColor: '#aaa',
    marginTop: 5,
    marginRight: 5,
  },
  inProcess: {width: 70, height: 5, backgroundColor: 'orange'},
  txtPercent: {color: 'orange'},
  inLine: {flexDirection: 'row', alignItems: 'center'},
  starIcon: {width: 15, height: 15},
  blurText: {color: '#aaa', marginRight: 50},
  link: {
    textDecorationLine: 'underline',
    color: '#144e8c',
    width: 500,
  },
  overBtn: {alignItems: 'center'},
  buttonDK: {
    width: 300,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtBtnDK: {color: '#fff'},
  text: {marginTop: 20},
  normalText: {fontSize: 15},
});
