import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import styles from './Style';
import { useNavigation } from '@react-navigation/native'
export default function TestDetail({ route }) {
    // const { setLesson } = props;
    const navigation = useNavigation();
    const { timeTest } = route.params;
    return (
        <View style={styles.container}>
            <Backbar
                title='Chi tiết cuộc thi'
            />
            <View style={styles.body}>
                <Image
                    source={require('../../img/image26.png')}
                    style={styles.imageDetailTest}
                />
                <Text
                    style={{ paddingLeft: scale(20), paddingTop: scale(30), fontWeight: '600', fontSize: scale(20) }}
                >
                    Kỳ thi đánh giá nhân viên
                </Text>
                <Text style={{ paddingLeft: scale(20), paddingTop: scale(20), fontWeight: '400', fontSize: scale(14) }}>
                    Ngày thi: {timeTest}
                </Text>
                <Text style={{ paddingLeft: scale(20), paddingTop: scale(15), fontWeight: '400', fontSize: scale(14) }}>
                    Điều kiện tham gia: Nhân viên bộ phận kỹ thuật
                </Text>
                <View style={{flexDirection:'row', paddingTop: scale(15)}}>
                    <Image 
                        style={{width:scale(16), height: scale(16), marginLeft: scale(20), marginRight: scale(5)}}
                        source={require('../../img/clock.png')}
                    />
                    <Text>60 phút</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonDetail}
                >
                    <Text style={{color: '#FFF', fontSize: scale(15)}}>Vào thi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
