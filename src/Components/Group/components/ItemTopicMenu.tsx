import React from 'react';
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

const ItemTopicMenu = () => {
  const topicState = useAppSelector(state => state.topic);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <View style={[GlobalStyles.container]}>
      <Header
        title="Đề tài của bạn"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
        iconRight={false}></Header>

      {topicState?.topic?.id ? (
        <View style={styles.containner}>
          <ItemTopic
            key={topicState?.topic?.id}
            topicInfo={topicState?.topic}
          />
        </View>
      ) : (
        <>
          <NoneData icon title="Nhóm chưa có Đề tài"></NoneData>
          <View style={[styles.contentBtn, styles.contentTopic]}>
            <Lottie
              source={require('../../../assets/jsonAmination/right-arrow-seemore.json')}
              autoPlay
              loop
              style={styles.btn}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteNames.TopicMenu);
              }}>
              <Text style={[styles.titleGroup]}>Chọn Đề tài</Text>
            </TouchableOpacity>
          </View>
        </>
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
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: Colors.bg,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
  contentTopic: {
    justifyContent: 'center',
    backgroundColor: '#d9bcbc',

    paddingBottom: responsiveHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
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
});
