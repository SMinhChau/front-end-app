import React, {useEffect, useMemo, useState} from 'react';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import 'moment/locale/vi';
import {StatusBar, StyleSheet, View, Text, Image, FlatList} from 'react-native';
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
import {Avatar, Banner, Card, IconButton} from 'react-native-paper';
import IconView from '../../../common/IconView';

const TopicMenu = () => {
  const userState = useAppSelector(state => state.user.user);
  const termState = useAppSelector(state => state.term.term);
  const groupState = useAppSelector(state => state.group.group);
  const [visible, setVisible] = useState(true);

  useEffect(() => {}, []);

  const isStartDateChooseTopic = () =>
    moment().isAfter(termState?.startDateChooseTopic);

  console.log(
    '>>>TopicMenu termState?.startDateChooseTopic',
    termState?.startDateChooseTopic,
  );
  console.log(
    'formatDD/MM/YYYY - hh:mm',
    moment(termState?.endDateChooseTopic).format('DD/MM/YYYY - hh:mm'),
  );

  var startDateChooseTopicFormat = moment(termState?.startDateChooseTopic)
    .locale('vi')
    .format('dddd, DD/MM/YYYY, h:mm:ss A');

  const DATETOPIC = [
    {
      title: 'Ngày bắt đầu',
      icon: 'ios-megaphone',
      date: moment(termState?.startDateChooseTopic)
        .locale('vi')
        .format('dddd, DD/MM/YYYY, h:mm:ss A'),
    },
    {
      title: 'Ngày kết thúc',
      icon: 'ios-megaphone',
      date: moment(termState?.endDateChooseTopic)
        .locale('vi')
        .format('dddd, DD/MM/YYYY, h:mm:ss A'),
    },
  ];
  const renderBannerDate = (item: any) => {
    return (
      <>
        <Card.Title
          style={styles.contentDate}
          title={item?.title}
          subtitle={item?.date}
          left={props => (
            <>
              <View
                {...props}
                style={[styles.viewIcon, GlobalStyles.centerView]}>
                <IconView name={item?.icon} color={Colors.red} size={26} />
              </View>
            </>
          )}
          right={props => (
            <IconButton {...props} icon="more-vert" onPress={() => {}} />
          )}
        />
      </>
    );
  };

  const renderContentTopic = useMemo(() => {
    return (
      <>
        <View style={styles.content}>
          <FlatList
            data={DATETOPIC}
            initialNumToRender={20}
            renderItem={(item: any) => renderBannerDate(item?.item)}
            keyExtractor={item => item.icon}
          />
        </View>
      </>
    );
  }, []);

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
            <>{renderContentTopic}</>
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
    fontSize: responsiveFont(18),
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
    left: 30,
    fontWeight: '500',
  },
  logo: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  viewIcon: {
    backgroundColor: '#ff9f1c',
    borderRadius: 10,
    borderColor: '#ff9f1c',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  contentDate: {
    backgroundColor: Colors.blueBoder,
    marginVertical: responsiveHeight(9),
  },
});
