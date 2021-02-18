import React, { useState } from 'react';
import {
    Image,
    TextInput,
    View,
    Text
} from 'react-native';
import styles from './Style';
const ViewBar = () => {
    const [key, onChangeKey] = useState();

    return (
        <View style={styles.viewBar}>
            <Image
                style={styles.imageMenu}
                source={require('../../img/menu.png')}
            />
            <View style={styles.searchContainer}>
                <TextInput
                    sty
                />
            </View>

        </View>
    );
}
export default ViewBar;