import React from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
export default function Test(props) {
    const { setLesson } = props;
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('TestDetail')}
        >
            <View style={styles.container}>
                <Image
                    style={styles.imageLogo}
                    source={require('../../img/image11.png')}>

                </Image>
                <Text style={styles.title}>
                    {setLesson.name}
                </Text>
                <Text>

                </Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5,
        height: 205,
        width: 180

    },
    imageLogo: {
        width: '100%',
        height: 90,
        // marginHorizontal: 8
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    title: {
        textTransform: 'uppercase',
        marginTop: 8,
        fontWeight: '700'
    }
})