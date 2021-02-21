import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const BeginScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper style={styles.wrapper} dotStyle={styles.swiperdot}>
            <View>
              <View style={styles.imagecontainer}>
                <Image
                  style={styles.image}
                  source={require('../img/asset1.png')}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Học tập mọi lúc, mọi nơi</Text>
                <Text style={styles.textBegin}>
                  Bạn có thể học mọi lúc mọi nơi dễ dàng chỉ với thiết bị có kết
                  nối internet
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.imagecontainer}>
                <Image
                  style={styles.image}
                  source={require('../img/Onboarding/asset2.png')}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>
                  Tìm kiếm bài học, bài thi dễ dàng
                </Text>
                <Text style={styles.textBegin}>
                  Dễ dàng tìm kiếm bài học, bài thi theo tên
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.imagecontainer}>
                <Image
                  style={styles.image}
                  source={require('../img/Onboarding/asset3.png')}
                />
              </View>
              <View style={styles.textcontainer}>
                <Text style={styles.title}>Thư viện tài liệu đa dạng</Text>
                <Text style={styles.textBegin}>
                  Thư viện bài giảng, tài liệu đồ sộ với hơn 50.000 học liệu
                </Text>
              </View>
            </View>
          </Swiper>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonBackText}>Bỏ qua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonNextText}>Tiếp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default BeginScreen;

const styles = StyleSheet.create({
  swiperdot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    flex: 1,
  },
  swiper: {
    height: '80%',
    width: '100%',
  },
  wrapper: {},
  imagecontainer: {
    marginTop: scale(60),
    height: scale(250),
    width: scale(350),
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: scale(230),
    width: scale(375),
  },
  textcontainer: {
    marginTop: scale(48),
    height: scale(150),
    width: scale(350),
    alignItems: 'center',
    paddingLeft: scale(20),
    paddingRight: scale(20),
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: scale(24),
  },
  textBegin: {
    alignSelf: 'center',
    fontSize: scale(13),
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: scale(20),
    height: scale(80),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(14),
  },
  buttonBack: {
    width: scale(155),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(5),
    borderWidth: scale(1),
    borderColor: 'orange',
  },
  buttonNext: {
    width: scale(155),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(5),
    backgroundColor: 'orange',
  },
  buttonBackText: {
    fontSize: scale(14),
    color: 'orange',
  },
  buttonNextText: {
    fontSize: scale(14),
    color: 'white',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
