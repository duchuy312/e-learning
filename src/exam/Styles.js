import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F5',

    },
    slider: {
        flex: 1,
        backgroundColor: '#144E8C',
        width: '100%',
        // height: 74,
        flexDirection: 'row'
    },
    imageMenu: {
        width: 25,
        height: 25,
        padding: 5,
        alignSelf: 'center',
        marginLeft: 15
    },
    inputText: {
        height: 45,
        width: 190,
        alignSelf: 'center',
        // alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#F6F4F5',
        marginLeft: 20,
        fontSize: 15,
    },
    imageSearch: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginLeft: 5

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
    imageNotice: {
        width: 25,
        height: 25,
        padding: 5,
        alignSelf: 'center',
        marginLeft: 18
    },
    imageDel: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    body: {
        flex: 7,
        backgroundColor: '#F6F4F5',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingLeft: 10, 
        // paddingRight: 10,
        width:'100%'

    }
    
});
export default styles;