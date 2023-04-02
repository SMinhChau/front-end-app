import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import 'moment/locale/vi';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

import NoneData from '../../Section/NoneData';
import {isEmpty, truncate} from 'lodash';
import {Avatar, Banner, Card, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import IconView from '../../../common/IconView';
import topicService from '../../../services/topic';
import Topic from '../../../utilities/Contant/Topic';
import ItemTopic from './ItemTopic';
import {number} from 'yup';
import {log} from 'react-native-reanimated';
import LoadingScreen from '../../../common/LoadingScreen';
import groupAPI from '../../../redux/apis/group';

const TopicMenu = () => {
  const userState = useAppSelector(state => state.user.user);
  const termState = useAppSelector(state => state.term.term);
  const groupState = useAppSelector(state => state.group.group);

  const [isLoading, setLoading] = useState(false);

  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    // getMyTopic();
    getToppicList();
  }, []);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // const getMyTopic = useCallback(() => {
  //   topicService
  //     .getTopicId(groupState?.topic?.id ? groupState?.topic?.id : 1)
  //     .then(result => {
  //       console.log('getMyTopic=============', result?.data);

  //       setMyTopic(result?.data);
  //     })
  //     .catch(error => console.log('getTopic error', error));
  // }, [groupState]);

  const getToppicList = useCallback(() => {
    topicService
      .getTopicList(termState?.id ? termState?.id : 0)
      .then(result => {
        setTopics(result?.data);
      });
  }, [groupState, isLoading]);

  const isStartDateChooseTopic = () =>
    moment().isAfter(termState?.startDateChooseTopic);

  var startDateChooseTopicFormat = moment(termState?.startDateChooseTopic)
    .locale('vi')
    .format('dddd, DD/MM/YYYY, h:mm:ss A');

  const DATETOPIC = [
    {
      id: 1,
      title: 'Ngày bắt đầu chọn Đề tài',
      icon: 'ios-megaphone',
      date: moment(termState?.startDateChooseTopic)
        .locale('vi')
        .format('dddd, DD/MM/YYYY, h:mm:ss A'),
    },
    {
      id: 2,
      title: 'Ngày kết thúc chọn Đề tài',
      icon: 'ios-megaphone-outline',
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
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
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
            <Lottie
              {...props}
              source={require('../../../assets/jsonAmination/arrow-right.json')}
              autoPlay
              loop
              style={styles.iconArrow}
            />
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
            horizontal={true}
            data={DATETOPIC}
            initialNumToRender={20}
            renderItem={(item: any) => renderBannerDate(item?.item)}
            keyExtractor={item => item.icon}
          />
        </View>
      </>
    );
  }, []);

  useEffect(() => {
    if (termState?.id) {
      dispatch(groupAPI.getMyGroup()(termState?.id));
    }
  }, [termState]);

  const handleChosseTopic = async (id: any) => {
    setLoading(true);
    await topicService.chooseTopic(termState?.id, id).then(async result => {
      console.log(' topicService.chooseTopic', result);
      setLoading(false);
      await dispatch(groupAPI.getMyGroup()(termState?.id));
      Alert.alert('Thông báo', 'Đã chọn đề tài ');
    });
  };

  const renderTopicList = useMemo(() => {
    return (
      <>
        <View style={[styles.contentTopic]}>
          {/* <View style={styles.viewIcon}>
            <IconView name="ios-apps-sharp" color={Colors.iconbr} size={26} />
          </View> */}
          <Lottie
            source={require('../../../assets/jsonAmination/loading_cricle.json')}
            autoPlay
            loop
            style={{width: 60}}
          />
          <View style={styles.viewTitle}>
            <Text style={styles.topTitle}>Danh sách Đề tài</Text>
            <Text style={styles.topTitle}>Số lượng: {topics?.length}</Text>
          </View>
          <Lottie
            source={require('../../../assets/jsonAmination/right-arrow-seemore.json')}
            autoPlay
            loop
            style={styles.logoList}
          />
        </View>
        <FlatList
          horizontal={true}
          data={topics}
          initialNumToRender={20}
          renderItem={(item: any) => (
            <ItemTopic
              key={item?.item}
              topicInfo={item?.item}
              handleChosseTopic={() => handleChosseTopic(item?.item?.id)}
            />
          )}
        />
      </>
    );
  }, [topics, groupState]);
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
              <View style={GlobalStyles.container}>
                {renderContentTopic}
                {renderTopicList}
              </View>
            </>
          )}
        </View>
      </View>
      {isLoading && <LoadingScreen />}
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
    flexDirection: 'column',
  },
  viewIcon: {
    // backgroundColor: '#f2cc8f',
    borderRadius: 10,
    borderColor: '#a3cecf',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  contentDate: {
    backgroundColor: '#a3cecf',
    borderRadius: 3,

    borderColor: Colors.blueBoder,
    borderWidth: 1,
    marginHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(9),
  },
  iconArrow: {
    width: 50,
    color: Colors.primary,
    height: 50,
  },
  titleStyle: {
    fontSize: responsiveFont(16),
    color: Colors.rosyBrown,
  },
  contentTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '10%',

    backgroundColor: '#f4978e',
    borderWidth: 3,
    borderColor: '#f08080',
    borderRadius: 5,
    paddingHorizontal: responsiveWidth(16),
    marginHorizontal: responsiveWidth(5),
  },
  topTitle: {
    position: 'relative',
    marginRight: responsiveWidth(20),
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(10),
  },
  subtitleStyle: {
    fontWeight: '500',
    color: Colors.black,
  },
  logoList: {
    width: 40,
  },
  viewTitle: {
    flexDirection: 'column',
  },
});
