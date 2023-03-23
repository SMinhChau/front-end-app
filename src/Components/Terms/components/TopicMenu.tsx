import moment from 'moment';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import {useAppSelector} from '../../../redux/hooks';
import termService from '../../../services/term';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

import NoneData from '../../Section/NoneData';
import {truncate} from 'lodash';

const TopicMenu = () => {
  const userState = useAppSelector(state => state.user.user);
  const termState = useAppSelector(state => state.term.term);
  const groupState = useAppSelector(state => state.group.group);
  console.log('>>>TopicMenu termState', termState);
  console.log('>>>TopicMenu groupState', groupState);

  useEffect(() => {}, []);

  const isStartDateChooseTopic = () =>
    moment().isAfter(termState?.startDateChooseTopic);

  var startDateChooseTopicFormat = moment(
    termState?.startDateChooseTopic,
  ).format('DD/MM/YYYY - hh:mm');

  const isEndDateChooseTopic = () =>
    moment() < moment(termState?.endDateChooseTopic);

  console.log(
    '>>>TopicMenu termState?.startDateChooseTopic',
    termState?.startDateChooseTopic,
  );
  console.log(
    '>>>termState?.startDateChooseTopic',
    moment(termState?.endDateChooseTopic).format('DD/MM/YYYY - hh:mm'),
  );
  console.log('>>>TopicMenu date', startDateChooseTopicFormat);

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

          {isStartDateChooseTopic() === false ? (
            <>
              <View style={styles.nonChooseTopic}>
                <View style={styles.contentNoData}>
                  <NoneData
                    icon
                    title="Chưa đến thời gian chọn đề tài!"></NoneData>
                </View>

                <View style={styles.bottomView}>
                  <Text style={styles.dateNoChooseTopic}>
                    Thời gian chọn đề tài là:
                  </Text>
                  <Lottie
                    source={require('../../../assets/jsonAmination/start.json')}
                    autoPlay
                    loop
                    style={styles.logo}
                  />
                  <Text style={[styles.dateNoChooseTopic, styles.leftTitle]}>
                    {startDateChooseTopicFormat}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text>{startDateChooseTopicFormat}</Text>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default TopicMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  nonChooseTopic: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  contentNoData: {
    height: responsiveHeight(50),
  },
  dateNoChooseTopic: {
    fontSize: responsiveFont(20),
  },
  bottomView: {
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(20),
    marginHorizontal: responsiveWidth(10),
    // backgroundColor: '#cbdfbd',
    borderRadius: 10,
    borderColor: '#76c893',
    marginTop: responsiveHeight(20),
    // flexDirection: 'row',
  },
  leftTitle: {
    color: Colors.rosyBrown,
    marginLeft: responsiveWidth(5),
    position: 'relative',
    top: -60,
    left: 90,
    fontWeight: '500',
  },
  logo: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
