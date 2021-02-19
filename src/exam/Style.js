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
        width: scale(20),
        height: scale(20),
        alignSelf: 'center',
        marginLeft: scale(10)
    },
    searchContainer: {
        flexDirection: 'row',
        height: scale(43),
        width: scale(250),
        borderRadius: scale(15),
        backgroundColor: '#F6F4F5',
        alignSelf: 'center',
        marginLeft: 20
    },
    imageBell: {
        width: scale(23),
        height: scale(23),
        alignSelf: 'center',
        marginLeft: scale(17)
    }, 
    imageSearch:{
        width: scale(20),
        height: scale(20),
        alignSelf: 'center',
        marginLeft: scale(10)
    },
    textInput:{
        width: scale(190),
        height: scale(40),
        fontSize: scale(15),
        alignSelf: 'center'
    },
    imageDelete:{
        width:scale(18),
        height: scale(18),
        alignSelf: 'center'
    }
});
export default styles;