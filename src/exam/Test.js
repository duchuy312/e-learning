import React, { useState } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { scale } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native'
export default function Test(props) {
    const navigation = useNavigation();
    const { setLesson } = props;
   
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress = {() => navigation.navigate('TestDetail')}>

         
                <Image
                    style={styles.imagelesson}
                    source={require('../../img/image11.png')}
                />
                <Text style={styles.title}>
                    {setLesson.name}
                </Text>
                <View style={styles.calendar}>
                    <Image
                        style={styles.imageCalendar}
                        source={require('../../img/calendar.png')}
                    />
                    <Text style={{ fontSize: scale(11), marginLeft: scale(5) }}>
                        {setLesson.time}
                    </Text>
                </View>

           
        </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#FFF',
        height: scale(205),
        marginTop: scale(10),
        marginLeft: scale(5),
        marginRight: scale(5),
        marginBottom: scale(5)
    },
    imagelesson: {
        width: '100%',
        height: scale(90),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    title: {
        fontSize: scale(15),
        marginLeft: scale(5),
        fontWeight: 'bold'
    },
    calendar: {
        flexDirection: 'row'
    },
    imageCalendar: {
        width: scale(13),
        height: scale(13),
        marginLeft: scale(5),
    }

}
);