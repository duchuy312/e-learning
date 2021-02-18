import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
const styles=StyleSheet.create({
    container: {
        flex: 1
    },
    viewBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#144E8C',
        
    },
    body: {
        flex: 9,

    },
    imageMenu: {
        width: 20,
        height: 20,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        height: 45,
        width: 260,
        borderRadius: 25,
        backgroundColor: '#F6F4F5',
        alignSelf: 'center',
        marginLeft: 20
    },
});
export default styles;