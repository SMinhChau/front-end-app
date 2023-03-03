import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
interface Props {}

const Modal: React.FC<Props> = ({}) => {
  return <View style={styles.content}></View>;
};
export default Modal;

const styles = StyleSheet.create({
  content: {
    width: '90%',
    height: '80%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
