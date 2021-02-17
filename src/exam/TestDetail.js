import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import BarView from './BarView';
import styles from './Styles';
export default function TestDetail() {
    return (
        <View style = {styles.container}>
            <View style={styles.slider}>
                <BarView />
            </View>
            <View style={styles.body}>
                <Text>
                    
                </Text>
            </View>
        </View>
    );
}