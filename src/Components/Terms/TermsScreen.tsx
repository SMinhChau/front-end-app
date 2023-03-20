import {useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import Header from '../../common/Header';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';
import TouchViewMenu from '../../common/TouchViewMenu';
import languages from '../../languages';
import Colors from '../../Themes/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveHeight, responsiveWidth} from '../../utilities/sizeScreen';
import RouteNames from '../RouteNames';

import {useNavigation} from '@react-navigation/native';

const TermsScreen: React.FC<{}> = () => {
  const navigation = useNavigation();

  const menu = [
    {
      name: 'Học kỳ',
      key: 'term',
      navigation: () => navigation.navigate(RouteNames.TermMenu),
      icon: 'book-sharp',
    },
    {
      name: 'Đề tài',
      key: 'topic',
      navigation: () => navigation.navigate(RouteNames.TopicMenu),
      icon: 'file-tray-full',
    },
  ];
  const menuBottom = [
    {
      name: 'Nhóm',
      key: 'group',
      navigation: () => navigation.navigate(RouteNames.GroupMenu),
      icon: 'people-circle',
    },
    {
      name: 'Giảng Viên',
      key: 'lecture',
      navigation: () => navigation.navigate(RouteNames.LectureMenu),
      icon: 'school',
    },
  ];
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
            {menu.map((item, index) => (
              <View style={styles.iconRight}>
                <Ionicons
                  name={item.icon}
                  color={Colors.primaryButton}
                  size={40}
                  style={styles.icon}
                />
                <TouchViewMenu
                  onPress={item.navigation}
                  title={item.name}></TouchViewMenu>
              </View>
            ))}
          </View>

          <View style={styles.topTop}>
            {menuBottom.map((item, index) => (
              <View style={styles.iconRight}>
                <Ionicons
                  name={item.icon}
                  color={Colors.primaryButton}
                  size={40}
                  style={styles.icon}
                />
                <TouchViewMenu
                  onPress={item.navigation}
                  title={item.name}></TouchViewMenu>
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};
export default TermsScreen;

const styles = StyleSheet.create({
  content: {
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
  iconRight: {},
  icon: {
    position: 'relative',
    right: responsiveWidth(-65),
    top: responsiveHeight(25),
    zIndex: 99999,
  },
});
