import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

interface Props {
  title?: string;
  visible?: any;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDes = ({title, visible, modalClose}: Props) => {
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          style={{height: '100%', marginHorizontal: responsiveWidth(20)}}>
          <View style={{backgroundColor: Colors.white}}>
            <Text style={styles.title}>Chi tiết</Text>
            <CloseButton
              style={styles.logo}
              onPress={() => modalClose(false)}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.sub}>{title}</Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default ModalDes;

const styles = StyleSheet.create({
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    margin: responsiveHeight(20),
  },
  sub: {
    color: Colors.textPrimary,
    textAlign: 'auto',
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(10),
    paddingBottom: responsiveHeight(10),
  },
});
