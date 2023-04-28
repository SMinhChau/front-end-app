import React from 'react';
import {StyleSheet} from 'react-native';
import Header from '../../common/Header';
import NoneData from '../Section/NoneData';
import {responsiveWidth} from '../../utilities/sizeScreen';

const Notification = () => {
  return (
    <>
      <Header
        title="Thông báo"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={true}></Header>
      <NoneData icon title="Chưa có thông báo nào"></NoneData>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: '#fde2e4',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
});
