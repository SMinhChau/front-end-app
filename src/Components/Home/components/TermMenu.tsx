import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {useAppSelector} from '../../../redux/hooks';
import languages from '../../../languages';
import moment from 'moment';

const TermMenu = () => {
  const termState = useAppSelector(state => state.term.term);

  const INFO_TERM = [
    {
      title: 'Tên học kỳ',
      value: termState?.name,
    },
    {
      title: 'Ngày bắt đầu',
      value: termState?.startDate,
    },
    {
      title: 'Ngày kết thúc',
      value: termState?.endDate,
    },
    {
      title: 'Ngày bắt đầu chọn đề tài',
      value: termState?.startDateChooseTopic,
    },
    {
      title: 'Ngày kết thúc chọn đề tài',
      value: termState?.endDateChooseTopic,
    },
    {
      title: 'Ngày bắt đầu đề tài',
      value: termState?.startDateSubmitTopic,
    },
    {
      title: 'Ngày kết thúc đề tài',
      value: termState?.endDateSubmitTopic,
    },
    {
      title: 'Ngày phản biện',
      value: termState?.dateDiscussion,
    },
    {
      title: 'Ngày báo cáo hội đồng',
      value: termState?.dateReport,
    },
  ];

  const formatDate = (date: string) => {
    return moment(date).locale('vi').format('dddd, DD/MM/YYYY, h:mm:ss A');
  };

  return (
    <>
      <View style={GlobalStyles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.primaryButton}
        />
        <Header
          title="Học kỳ"
          iconLeft={true}
          home={false}
          style={styles.header}
          back={true}
          iconRight={true}></Header>
        <View style={styles.containner}>
          {INFO_TERM.map(item => {
            if (item?.title === 'Tên học kỳ') {
              return (
                <View style={[styles.contentTitle, GlobalStyles.centerView]}>
                  <Text numberOfLines={1} style={[styles.titleGroup]}>
                    {item?.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.titleGroup, styles.title]}>
                    {item?.value}
                  </Text>
                </View>
              );
            }
            return (
              <View style={styles.content}>
                <Text numberOfLines={1} style={[styles.titleGroup]}>
                  {item?.title}
                </Text>
                <Text numberOfLines={1} style={[styles.textValue]}>
                  {formatDate(item?.value)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default TermMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: '#d8e2dc',
    borderColor: '#aed9e0',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(16),
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
    textTransform: 'uppercase',
  },
  textValue: {
    fontSize: responsiveFont(17),
    color: '#277da1',
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
    marginHorizontal: responsiveWidth(10),
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: responsiveHeight(10),
  },
  title: {
    marginHorizontal: responsiveWidth(10),
  },
  contentTitle: {
    backgroundColor: '#aed9e0',
    paddingVertical: responsiveHeight(10),
  },
});
