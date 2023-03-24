import React from 'react';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import GlobalStyles from './styles/GlobalStyles';
import {StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return (
    <>
      <Portal>
        <Modal visible style={[styles.contentModal, GlobalStyles.centerView]}>
          <ActivityIndicator size={'large'} color={'#bec7ef'} />
        </Modal>
      </Portal>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  contentModal: {
    flex: 1,
  },
});
