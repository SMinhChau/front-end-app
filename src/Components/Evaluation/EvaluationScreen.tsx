import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import Lottie from 'lottie-react-native';

import GlobalStyles from '../../common/styles/GlobalStyles';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import ContentAccount from '../../common/ContentAccount';
import languages from '../../languages';
import data from './data';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useEffect, useMemo, useRef, useState} from 'react';
import majorAPI from '../../redux/apis/major';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';
import termrAPI from '../../redux/apis/term';
import groupAPI from '../../redux/apis/group';

interface data {
  data: data;
}

const EvaluationScreen: React.FC<data> = ({}) => {
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

  const majorView = useMemo(() => {
    return (
      <View style={[styles.contentMenu, GlobalStyles.margin20]}>
        <View style={[styles.contentMain]}>
          <Text style={styles.titleMain}>{languages['vi'].special}</Text>
        </View>
        <Text style={styles.title}>{majorState?.name}</Text>
      </View>
    );
  }, [majorState]);

  const groupView = useMemo(() => {
    return (
      <>
        <View style={styles.main}>
          <View
            style={[
              styles.contentGroup,
              GlobalStyles.margin20,
              GlobalStyles.centerView,
            ]}>
            <View style={[styles.contentLogo]}>
              <Text style={styles.titleLogoGroup}>Xin chào</Text>
            </View>

            <Text style={[styles.title]}>{userState?.user?.name}</Text>
          </View>

          {groupState?.group?.id ? (
            <View style={GlobalStyles.flexDirectionRow}>
              <Text style={[styles.mainText]}>Nhóm của bạn:</Text>
              <Text style={[styles.titleLogoGroup, styles.mainText]}>
                {groupState?.group?.name}
              </Text>
            </View>
          ) : (
            <>
              <Text style={[styles.titleLogoGroup, styles.titleNonGroup]}>
                Bạn chưa có nhóm. Vui lòng chọn nhóm
              </Text>
              <Lottie
                source={require('../../../src/assets/jsonAmination/warning.json')}
                autoPlay={true}
                loop
                style={styles.logoAmination}
              />
            </>
          )}
        </View>
      </>
    );
  }, [groupState, termState]);

  return (
    <View style={GlobalStyles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.primaryButton}
      />

      <View style={styles.containner}>
        <Header
          title="Trang chủ"
          iconLeft={true}
          home={false}
          iconRight={true}></Header>
        <ContentAccount></ContentAccount>

        {majorView}

        <View style={styles.bottom}>
          <Lottie
            source={require('../../assets/jsonAmination/88012-student-animated-icon.json')}
            autoPlay
            loop
            style={styles.amination}
          />
          {groupView}
        </View>
      </View>
    </View>
  );
};
export default EvaluationScreen;

const styles = StyleSheet.create({
  formView: {
    paddingHorizontal: responsiveWidth(20),
    backgroundColor: Colors.bg,
  },
  containner: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  contentMenu: {
    height: responsiveHeight(50),

    backgroundColor: '#80d0f3',

    borderColor: Colors.blueBoder,
    borderTopWidth: 1,
    borderRadius: 5,
    marginVertical: responsiveHeight(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  contentGroup: {
    padding: 10,
    backgroundColor: Colors.primaryButton,
    borderRadius: 5,
    borderColor: Colors.blueBoder,
    marginBottom: 10,
    borderTopWidth: 1,
  },
  contentMain: {
    position: 'absolute',
    top: -20,
    left: 2,
    padding: 3,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: Colors.blueBoder,
  },
  contentLogo: {
    position: 'absolute',
    top: -20,
    left: 2,
    padding: 3,
    borderWidth: 1,
    backgroundColor: Colors.drakCyonBoder,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: Colors.rosyBrown,
  },
  titleMain: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(10),
  },
  title: {
    fontSize: responsiveFont(18),
    color: Colors.rosyBrown,
    fontWeight: '500',

    textDecorationStyle: 'double',
  },
  titleLogoGroup: {
    fontSize: responsiveFont(17),
    color: Colors.bg,
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(20),
    textDecorationStyle: 'double',
  },
  titleNonGroup: {
    color: Colors.headerColor,
  },
  bottom: {
    backgroundColor: '#caf0f8',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: responsiveHeight(20),
    marginHorizontal: responsiveWidth(10),
    borderColor: Colors.blueBoder,
  },
  mainText: {
    fontWeight: '500',
    textDecorationStyle: 'solid',
    color: Colors.drakCyonBoder,
    marginLeft: responsiveWidth(15),
  },

  amination: {
    width: responsiveWidth(60),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    top: -20,
  },
  main: {
    position: 'relative',
    top: responsiveHeight(-35),
  },
  logoAmination: {
    position: 'absolute',
    right: -180,
  },
});
