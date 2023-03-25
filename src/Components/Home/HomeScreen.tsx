import {useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  LogBox,
  TouchableOpacity,
} from 'react-native';

import Lottie from 'lottie-react-native';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import majorAPI from '../../redux/apis/major';
import termrAPI from '../../redux/apis/term';
import groupAPI from '../../redux/apis/group';
import {menu, menuBottom} from './content';

const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const majorState = useAppSelector(state => state.major.major);
  const userState = useAppSelector(state => state.user);
  const termState = useAppSelector(state => state.term.term);
  const groupState = useAppSelector(state => state.group);

  useEffect(() => {
    console.log('userState============= user', userState?.user);

    if (userState?.user?.majors?.id) {
      dispatch(majorAPI.getMajorById()(userState?.user?.majors?.id));
      dispatch(termrAPI.getLastTerm()(userState?.user?.majors?.id));
    }
  }, [userState]);

  useEffect(() => {
    if (termState?.id) {
      dispatch(groupAPI.getMyGroup()(termState?.id));
    }
  }, [termState]);

  return (
    <>
      <Header title="Trang chủ" iconRight={true}></Header>
      <View style={styles.contentTop}>
        <Lottie
          source={require('../../assets/jsonAmination/hello_1.json')}
          autoPlay
          loop
          style={styles.iconUser}
        />
        <Text>{userState?.user?.name}</Text>
      </View>
      <View style={[GlobalStyles.container, styles.content]}>
        <View style={styles.top}>
          <View style={styles.topTop}>
            {menu.map((item, index) => (
              <View key={index} style={styles.iconRight}>
                <Ionicons
                  name={item.icon}
                  color={item?.color}
                  size={40}
                  style={styles.icon}
                />
                <TouchViewMenu
                  backgroundColor={item?.backgroundColor}
                  borderColor={item?.color}
                  onPress={item.navigation}
                  title={item.name}></TouchViewMenu>
              </View>
            ))}
          </View>

          <View style={styles.topTop}>
            {menuBottom.map((item, index) => (
              <View key={index} style={styles.iconRight}>
                <Ionicons
                  name={item.icon}
                  color={item?.color}
                  size={40}
                  style={styles.icon}
                />
                <TouchViewMenu
                  backgroundColor={item?.backgroundColor}
                  borderColor={item?.color}
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
export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    paddingTop: responsiveHeight(20),
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
  iconUser: {
    width: 100,
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
