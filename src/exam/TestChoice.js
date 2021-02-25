import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    Image
} from 'react-native';

//  import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
// import Navigation from '../../Navigation/navigations';
import Backbar from '../components/BackBar';

const TestChoice = ({navigation}) => {
    
    const [checked, setChecked] = React.useState();
    const [show, setShow] = useState(false);
    const [key, onChangeText] = React.useState('');
    const [code, setCode] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    function byCode() {
        onChangeText('120198')
    }
    function Check() {
        setShow(!show)
        setChecked("first")
    }


    return (
        <View style={styles.container}>
            <Backbar title='    Tên kỳ thi' />
            <Text style={styles.textTittle}>
                Chọn phương thức đăng ký thi:
            </Text>
            <View style={styles.containerRadio}>
                <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => Check()}
                    color='#144E8C'
                />
                <Text style={{ fontSize: scale(15), alignSelf: 'center' }}>Đăng ký bằng mã code</Text>
            </View>
            <View style={styles.containerRadio}>

                <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                    color='#144E8C'
                />

                <Text style={{ fontSize: scale(15), alignSelf: 'center' }} >Đăng ký chờ phê duyệt</Text>

            </View>

            {show === true ? (
                <View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Image 
                                        source={require('../../img/Tick.png')}
                                        style={{ width:scale(52),height: scale(38) }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </Modal>
                    <TextInput
                        style={styles.txtInput}
                        onChangeText={text => onChangeText(text)}
                        value={key}
                        keyboardType="numeric"
                        placeholder={'Nhập mã cuộc thi'} />

                    <TouchableOpacity style={styles.buttonActive} onPress={() => setCode(true)}>
                        <Text style={{ color: '#FFF', fontSize: scale(15) }}>Gửi yêu cầu</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                    <TouchableOpacity style={styles.buttonInactive} >

                        <Text style={{ color: '#FFF', fontSize: scale(15) }}>Gửi yêu cầu</Text>
                    </TouchableOpacity>
                )}

        </View>
    );
}
export default TestChoice;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    textTittle: {
        fontSize: scale(20),
        fontWeight: '700',
        paddingTop: scale(90),
        alignSelf: 'center',
        paddingBottom: scale(15)

    },
    containerRadio: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    buttonActive: {
        width: scale(300),
        height: scale(45),
        borderRadius: scale(20),
        backgroundColor: '#FCB71E',
        marginTop: scale(30),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonInactive: {
        width: scale(300),
        height: scale(45),
        borderRadius: scale(20),
        backgroundColor: '#C4C4C4',
        marginTop: scale(30),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        width: scale(300),
        height: scale(45),
        borderRadius: scale(20),
        backgroundColor: '#F6F4F5',
        alignSelf: 'center',
        paddingHorizontal: 100,
        marginTop: scale(20),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(20)
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});