import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Lottie from 'lottie-react-native';
import Header from '../../common/Header';
import GlobalStyles from '../../common/styles/GlobalStyles';
import TouchViewMenu from '../../common/TouchViewMenu';
import Colors from '../../Themes/Colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';
import RouteNames from '../RouteNames';

import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import majorAPI from '../../redux/apis/major';
import termrAPI from '../../redux/apis/term';
import groupAPI from '../../redux/apis/group';
import authAPI from '../../redux/apis/auth';

const menu = [
  {
    name: 'Học kỳ',
    key: 'term',
    navigation: RouteNames.TermMenu,
    icon: 'book-sharp',
    color: '#bc6c25',
    backgroundColor: Colors.white,
  },
  {
    name: 'Đề tài',
    key: 'topic',
    navigation: RouteNames.TopicMenu,
    icon: 'file-tray-full',
    color: '#0077b6',
    backgroundColor: Colors.white,
  },
];
const menuBottom = [
  {
    name: 'Đánh giá',
    key: 'check',
    navigation: RouteNames.EvaluationMenu,
    icon: 'people-circle',
    color: '#a7c957',
    backgroundColor: Colors.white,
  },
  {
    name: 'Giảng Viên',
    key: 'lecture',
    navigation: RouteNames.LectureMenu,
    icon: 'school',
    color: '#f08080',
    backgroundColor: Colors.white,
  },
];

const HomeScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const userState = useAppSelector(state => state.user);
  const termState = useAppSelector(state => state.term.term);

  useEffect(() => {
    if (userState?.user?.majors?.id) {
      dispatch(majorAPI.getMajorById()(userState?.user?.majors?.id));
      dispatch(termrAPI.getTermNow()(userState?.user?.majors?.id));
    }
  }, [userState]);

  useEffect(() => {
    if (userState.allow === false) {
      navigation.navigate(RouteNames.DisAcceptedUser);
    }
  }, [userState, termState]);

  useEffect(() => {
    if (termState?.id) {
      dispatch(groupAPI.getMyGroup()(termState?.id));
    }
  }, [termState]);

  useEffect(() => {
    if (termState.id) {
      dispatch(authAPI.getTranscripts()(termState.id));
    }
  }, []);

  return (
    <>
      <Header logo title="Trang chủ" iconRight={true} iconLeft></Header>
      <View style={styles.contentTop}>
        <Lottie
          source={require('../../assets/jsonAmination/hello.json')}
          autoPlay
          loop
          style={styles.iconUser}
        />

        <View style={styles.nameContent}>
          <Text style={styles.nameTitle}>{userState?.user?.name}</Text>
        </View>
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
                  onPress={() => navigation.navigate(item?.navigation)}
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
                  onPress={() => navigation.navigate(item?.navigation)}
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
    backgroundColor: Colors.bg,
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
    width: 80,
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.bg,
    // borderBottomRightRadius: 200,
    // borderColor: 'none',
    // borderBottomLeftRadius: 5,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 0,
    // overflow: 'hidden',
  },

  nameTitle: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#941b0c',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  nameContent: {
    flexDirection: 'column',
    width: '50%',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(5),
  },
});
