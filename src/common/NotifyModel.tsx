import React, {FC, useRef, useState} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {Rect} from 'react-native-safe-area-context';

interface Props {
  text: string;
}
const NotifyModel: React.FC<Props> = ({text}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'a',
            justifyContent: 'center',
            margin: 25,
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>{text}</Text>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          showModal();
        }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default NotifyModel;
