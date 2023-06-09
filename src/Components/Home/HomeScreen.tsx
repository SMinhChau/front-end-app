import {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';

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
      <Header logo home title="Trang chủ" iconRight={true}></Header>
      <View style={styles.contentTop}>
        <View style={styles.iconUser}>
          <Lottie
            source={require('../../assets/jsonAmination/hello.json')}
            autoPlay
            style={{width: 80}}
          />
        </View>

        <View style={styles.nameContent}>
          <Text style={styles.nameTitle}>{userState?.user?.name}</Text>
        </View>
      </View>
      <View style={[GlobalStyles.container, styles.content]}>
        <ScrollView>
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
        </ScrollView>
      </View>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
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
    right: responsiveWidth(-58),
    top: responsiveHeight(25),
    zIndex: 99999,
  },

  iconUser: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(10),
    borderRadius: 20,
    borderColor: '#ffb3c6',
    // backgroundColor: '#ffe5ec',
    borderWidth: 2,
  },
  contentTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderColor: Colors.bg,
    borderWidth: 1,
    shadowOpacity: 1,
    paddingVertical: responsiveHeight(2),
    shadowOffset: {width: 2, height: 3},
  },

  nameTitle: {
    textAlign: 'center',
    fontSize: responsiveFont(20),
    color: '#941b0c',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  nameContent: {
    flexDirection: 'column',
    width: '50%',
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(5),
    backgroundColor: Colors.white,
  },
  titleModal: {
    fontSize: responsiveFont(15),
    color: '#003049',
  },
  btn: {
    width: '100%',
  },
  view_Portal: {
    backgroundColor: '#e9d8a6',
  },
});
