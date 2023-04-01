import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {responsiveWidth} from '../../../utilities/sizeScreen';
import {useAppSelector} from '../../../redux/hooks';

const TermMenu = () => {
  const termState = useAppSelector(state => state.term);
  console.log('termState', termState?.term?.id);

  return (
    <>
      <View style={GlobalStyles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.primaryButton}
        />

        <View style={styles.containner}>
          <Header
            title="Học kỳ"
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

export default TermMenu;

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
