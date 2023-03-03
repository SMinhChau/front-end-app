import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Images} from '../assets/images/Images';
import GlobalStyles from './styles/GlobalStyles';
import languages from '../languages';
import Colors from '../Themes/Colors';
import TextItem from '../Components/Home/components/TextItem';
import RouteNames from '../Components/RouteNames';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';
import {responsiveHeight, responsiveWidth} from '../utilities/sizeScreen';

const Props = {};

const ContentAccount: React.FC<{}> = () => {
  const navigation = useNavigation();
  const userState = useAppSelector(state => state.user.user);

  const renderItemView = () => {
    return (
      <View style={styles.sub}>
        <TextItem
          textLeft={languages['vi'].code}
          textRight={userState?.username}></TextItem>
        <TextItem
          textLeft={languages['vi'].name}
          textRight={userState?.name}></TextItem>
        <TextItem
          textLeft={languages['vi'].numberPhone}
          textRight={userState?.phoneNumber}></TextItem>
        <TextItem
          textLeft={languages['vi'].schoolYear}
          textRight={userState?.schoolYear}></TextItem>
        <TextItem
          textLeft={languages['vi'].email}
          textRight={userState.email}></TextItem>
      </View>
    );
  };
  return (
    <>
      <View
        style={[
          styles.contentInfor,
          GlobalStyles.borderContent,
          GlobalStyles.margin20,
        ]}>
        <View style={[styles.contentInfo]}>
          <View style={styles.left}>
            <Text style={styles.titleText}>{languages['vi'].info}</Text>
          </View>
          <Image
            source={
              userState?.avatar ? {uri: userState?.avatar} : Images.avatar
            }
            style={styles.imgaAvatar}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.accountTab)}>
            <Text style={styles.textDetail}>{languages['vi'].detail}</Text>
          </TouchableOpacity>
        </View>

        {renderItemView()}
      </View>
    </>
  );
};

export default ContentAccount;

const styles = StyleSheet.create({
  contentInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentInfor: {
    height: responsiveHeight(390),
    padding: 10,
    backgroundColor: Colors.white,
  },
  imgaAvatar: {
    width: responsiveWidth(65),
    height: responsiveHeight(80),
    resizeMode: 'contain',
    borderRadius: 40,
    margin: 15,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    // shadowOffset: {width: 2, height: 3},
  },
  left: {
    position: 'absolute',
    top: -25,
    backgroundColor: Colors.primary,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    alignItems: 'center',
    fontSize: 18,
    color: Colors.textPrimary,
    paddingHorizontal: 10,
  },
  sub: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  subTitle: {
    paddingVertical: responsiveWidth(9),
    fontSize: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textDetail: {
    color: Colors.primaryButton,
    textDecorationColor: Colors.drakCyonBoder,
  },
});
