import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import Backbar from '../components/BackBar';
import {SendIcon} from '../../svg/icon';
import SockJS from 'sockjs-client/dist/sockjs';
import * as Stomp from '@stomp/stompjs';
import axios from 'axios';

const ChatRoom = () => {
  const route = useRoute();
  const RoomName = '  Room  ' + route.params.nameRoom;
  var sock = new SockJS('https://elearning.tmgs.vn/sock');
  const navigation = useNavigation();
  const [comment, setComment] = useState('');
  const ClearInput = () => {
    setComment('');
  };
  sock.onopen = function () {
    console.log('open');
    sock.send('test');
  };
  sock.onmessage = function (e) {
    console.log('message', e.data);
    sock.close();
  };

  sock.onclose = function () {
    console.log('close');
  };
  const getChatLogAPI = async () => {
    await axios
      .post(
        'https://elearning.tmgs.vn/chatmess/api/chatmess',
        {
          id: route.params.idRoom,
          curPage: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${route.params.token}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    getChatLogAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getChatLog = () => {
    this.setState({loading: true});
    let page;
    if (this.state.page === 1) {
      page = '';
    } else {
      page = this.state.totalPage - this.state.page + 2;
    }
    getChatLogAPI(this.data.roomId, page, this.data.token)
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          if (json.length > 0) {
            this.setState({totalPage: json[0].maxPage - 1});
            let newArr = this.state.chatContent.concat(json);
            this.setState({chatContent: newArr});
            this.setState({page: this.state.page + 1});
          }
        }
      })
      .catch((error) => {
        console.log({
          message: 'Không lấy được dữ liệu nhật ký trò chuyện',
          type: 'warning',
        });
      })
      .finally(() => {
        this.setState({loading: false});
      });
  };
  return (
    <View style={styles.container}>
      <Backbar title={RoomName} />
      <View style={styles.containerChat}>
        <View style={styles.InputContainer}>
          <View style={styles.inputArea}>
            <TextInput
              value={comment}
              style={styles.InputText}
              placeholder={'Bình Luận....'}
              onChangeText={(input) => setComment(input)}
            />
          </View>
          <TouchableOpacity
            style={styles.SendButton}
            onPress={() => {
              ClearInput();
            }}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  containerChat: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  CommentContainer: {
    width: '100%',
    height: scale(100),
    borderTopWidth: scale(1 / 2),
    flexDirection: 'row',
  },
  AvatarUserContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CommentData: {
    width: '70%',
    height: '100%',
    paddingTop: scale(5),
  },
  circle: {
    height: scale(80),
    width: scale(80),
    overflow: 'hidden',
    borderRadius: scale(40),
  },
  AvatarUser: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  commentText: {
    fontSize: scale(14),
  },
  NameUser: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  timeText: {
    color: '#cecece',
  },
  InputContainer: {
    width: '100%',
    height: scale(60),
    borderTopWidth: scale(1 / 2),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputArea: {
    width: '80%',
    height: scale(50),
    justifyContent: 'center',
  },
  InputText: {
    fontSize: scale(14),
  },
  SendButton: {
    height: scale(44),
    width: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
