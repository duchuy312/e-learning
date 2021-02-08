import React from 'react';
import {
    View,
    TextInput,
    Image
} from 'react-native';
import styles from './Styles';
export default function BarView() {
    const [key, keySearch] = React.useState();
    return (
        <View style={styles.slider}>
            <Image
                style={styles.imageMenu}
                source={require('../../assets/menubar.png')}
            />
            <View style={styles.searchContainer}>
                <Image
                    style={styles.imageSearch}
                    source={require('../../assets/search.png')}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={text => keySearch(text)}
                    value={key}
                    placeholder={'Tìm khoá học'}>
                </TextInput>
                <Image
                    style={styles.imageDel}
                    source={require('../../assets/delete.png')}
                >

                </Image>
            </View>

            <Image
                style={styles.imageNotice}
                source={require('../../assets/bell.png')}
            />

        </View>
    );
}