import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Header from '../../../common/Header';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import NoneData from '../../Section/NoneData';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

import ItemTopic from '../../Home/components/ItemTopic';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../../RouteNames';
import Topic from '../../../utilities/Contant/Topic';
import topicService from '../../../services/topic';

const ItemTopicMenu = () => {
  const groupState = useAppSelector(state => state.group.group);

  const [topic, setTopic] = useState<Topic>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getInfoGroup();
  }, [groupState?.topic?.id]);

  const getInfoGroup = () => {
    topicService.getTopicId(Number(groupState?.topic?.id)).then(result => {
      console.log('>>>>>>>>>>>>>>>>>groupState?.topic?.id', result.data);
      setTopic(result?.data);
    });
  };

  return (
    <View style={[GlobalStyles.container]}>
      <Header
        title="Đề tài của bạn"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={false}></Header>

      {topic?.id ? (
        <View style={styles.containner}>
          <ItemTopic
            key={groupState?.topic?.id}
            topicInfo={topic}
            handleChosseTopic={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      ) : (
        <View style={[GlobalStyles.centerView, styles.center]}>
          <View style={styles.nonData}>
            <NoneData icon title="Nhóm chưa có Đề tài"></NoneData>
          </View>
          <View style={[styles.contentBtn, styles.contentTopic]}>
            <Lottie
              source={require('../../../assets/jsonAmination/right-arrow-seemore.json')}
              autoPlay
              loop
              style={styles.btn}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteNames.TopicMenus);
              }}>
              <Text style={[styles.titleGroup]}>Chọn Đề tài</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {isLoading && <LoadingScreen />} */}
    </View>
  );
};

export default ItemTopicMenu;

const styles = StyleSheet.create({
  containner: {
    marginTop: responsiveHeight(20),
    flex: 1,
  },
  center: {
    flex: 1,
    backgroundColor: '#eaf4f4',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: '#eaf4f4',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
  contentTopic: {
    width: '100%',
    paddingVertical: responsiveHeight(10),
    justifyContent: 'center',
    backgroundColor: '#d9bcbc',
    flexDirection: 'row',
  },
  btn: {
    width: 50,
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
    textTransform: 'uppercase',
  },
  nonData: {
    width: '100%',
    height: responsiveHeight(100),
  },
});
