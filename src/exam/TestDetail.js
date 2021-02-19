import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Backbar from '../components/BackBar';
import styles from './Style';
export default function TestDetail() {
    return (
        <View style={styles.container}>
            <Backbar
                title='Chi tiết cuộc thi'
            />
            <View style={styles.body}>

            </View>
        </View>
    );

}