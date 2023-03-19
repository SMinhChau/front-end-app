import {useEffect} from 'react';
import {StatusBar, View, Text, StyleSheet, LogBox} from 'react-native';
import Header from '../../common/Header';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';
import TouchViewMenu from '../../common/TouchViewMenu';
import languages from '../../languages';
import Colors from '../../Themes/Colors';
import Lottie from 'lottie-react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveHeight, responsiveWidth} from '../../utilities/sizeScreen';
const TermsScreen: React.FC<{}> = () => {
  return (
    <>
      <Header
        title="Đề tài"
        // iconLeft={true}
        // home={true}
        iconRight={true}></Header>

      <View style={[GlobalStyles.container, styles.content]}>
        <View style={styles.top}>
          <View style={styles.topTop}>
            <View style={styles.iconRight}>
              <TouchViewMenu title={languages['vi'].term}></TouchViewMenu>
            </View>
            <View style={styles.iconRight}>
              {/* <Ionicons
                name={'file-tray-full'}
                color={Colors.primaryButton}
                size={40}
                style={styles.icon}
              /> */}
              <TouchViewMenu title={languages['vi'].title}></TouchViewMenu>
            </View>
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.topTop}>
            <View style={styles.iconRight}>
              {/* <Ionicons
                name={'people-circle'}
                color={Colors.primaryButton}
                size={40}
                style={styles.icon}
              /> */}
              <TouchViewMenu title={languages['vi'].group}></TouchViewMenu>
            </View>
            <View style={styles.iconRight}>
              {/* <Ionicons
                name={'school'}
                color={Colors.primaryButton}
                size={40}
                style={styles.icon}
              /> */}
              <TouchViewMenu title={languages['vi'].teacher}></TouchViewMenu>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
export default TermsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: responsiveHeight(60),
  },
  top: {
    justifyContent: 'center',
    alignContent: 'center',
  },

  topTop: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconRight: {
    position: 'relative',
  },
  iconTerm: {
    position: 'relative',
    right: responsiveWidth(-65),

    zIndex: 1,
  },
  icon: {
    position: 'relative',
    right: responsiveWidth(-65),
    top: responsiveHeight(25),
    zIndex: 99999,
  },
});
