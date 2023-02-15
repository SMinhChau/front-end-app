import React, {useMemo} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Images} from '../assets/images/Images';
import GlobalStyles from './styles/GlobalStyles';
import languages from '../languages';
import Colors from '../Themes/Colors';
import TextItem from '../Components/Home/components/TextItem';
import RouteNames from '../Components/RouteNames';
import {useNavigation} from '@react-navigation/native';

const Props = {};

const ContentAccount: React.FC<{}> = () => {
  const navigation = useNavigation();
  const renderItemView = () => {
    return (
      <View style={styles.sub}>
        <TextItem
          textLeft={languages['vi'].code}
          textRight={'19468371'}></TextItem>
        <TextItem
          textLeft={languages['vi'].name}
          textRight={'19468371'}></TextItem>
        <TextItem
          textLeft={languages['vi'].dayofbirth}
          textRight={'19468371'}></TextItem>
        <TextItem
          textLeft={languages['vi'].class}
          textRight={'19468371'}></TextItem>
        <TextItem
          textLeft={languages['vi'].email}
          textRight={
            'dsjdbjsbfdhmgbdkdfsfsfsgfjgkdf@gmailhfghgfhjdfjd'
          }></TextItem>
      </View>
    );
  };
  return (
    <>
      <TouchableOpacity
        style={[
          styles.contentInfor,
          GlobalStyles.borderContent,
          GlobalStyles.margin20,
        ]}
        onPress={() => navigation.navigate(RouteNames.homeTab)}>
        <View style={[styles.contentInfo]}>
          <View style={styles.left}>
            <Text style={styles.titleText}>{languages['vi'].info}</Text>
          </View>
          <Image source={Images.avatar} style={styles.imgaAvatar} />
        </View>

        {renderItemView()}
      </TouchableOpacity>
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
    height: 300,
    padding: 10,
    backgroundColor: Colors.white,
  },
  imgaAvatar: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    borderRadius: 40,
    margin: 10,
  },
  left: {
    position: 'absolute',
    top: -25,
    backgroundColor: Colors.primary,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    borderRadius: 3,
  },
  titleText: {
    alignItems: 'center',
    fontSize: 18,
    color: Colors.grayLight,
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
    paddingVertical: 9,
    fontSize: 15,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
