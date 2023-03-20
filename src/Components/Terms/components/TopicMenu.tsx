import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {responsiveWidth} from '../../../utilities/sizeScreen';

const TopicMenu = () => {
  return (
    <>
      <View style={GlobalStyles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.primaryButton}
        />

        <View style={styles.containner}>
          <Header
            title="Đề tài"
            iconLeft={true}
            home={false}
            style={styles.header}
            back={true}
            iconRight={true}></Header>
        </View>
      </View>
    </>
  );
};

export default TopicMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
});
