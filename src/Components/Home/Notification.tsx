import React, {useEffect, useMemo, useState} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../common/Header';
import NoneData from '../Section/NoneData';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';
import Notify from '../../utilities/Contant/notify';
import authService from '../../services/auth';
import {Card, Divider, Text} from 'react-native-paper';
import IconView from '../../common/IconView';
import Colors from '../../Themes/Colors';
import {FlatList} from 'react-native-gesture-handler';
import {showMessageSuccess} from '../../utilities/utils';
import {TypeNotificationPath} from '../../utilities/contants';
import {useNavigation} from '@react-navigation/native';
import {setNotySlice} from '../../redux/slices/UserSlices';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import RouteNames from '../RouteNames';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Notification = () => {
  const [notify, setNotify] = useState<Array<Notify>>([]);
  const userState = useAppSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getNotifyApi();
  }, []);

  const getNotifyApi = async () => {
    authService
      .getAllMotify()
      .then(result => {
        setNotify(result.data);

        let ary = [];
        result.data.forEach((i: {read: number}) => {
          if (i.read === 0) {
            ary.push(i);
          }
        });
        dispatch(setNotySlice(ary.length));
      })
      .catch(error => console.log('errr', error));
  };

  const handleClickItem = async (id: number) => {
    const m = notify.filter(item => id === item.id)[0];
    console.log('m-> ', m.type);

    const path = TypeNotificationPath[m.type];
    console.log('path', path);

    await authService
      .readNotify(id)
      .then(result => {
        showMessageSuccess(`Đã đọc thông báo:  ${result.data.message}`);
        navigation.navigate(`${path}`);
        getNotifyApi();
      })
      .catch(error => console.log('errr', error));
  };

  const handleReadAllNotify = async () => {
    await authService
      .readAllNotify()
      .then(result => {
        showMessageSuccess('Đánh dấu tất cả là đã đọc');
        getNotifyApi();
      })
      .catch(error => console.log('errr', error));
  };

  const renderItemNoty = (item: Notify) => {
    return (
      <>
        <Card.Title
          style={[
            styles.itemContent,
            {backgroundColor: item.read === 0 ? '#ffffff' : '#eaf4f4'},
          ]}
          title={
            <Text
              style={[
                styles.itemTitle,
                {color: item.read === 0 ? '#f07167' : '#6d6875'},
              ]}>
              Thông báo
            </Text>
          }
          subtitle={
            <Text
              style={[
                styles.itemTitle,
                {color: item.read === 0 ? '#264653' : '#adb5bd'},
              ]}>
              {item.message}
            </Text>
          }
          left={props => (
            <IconView
              name="notifications-outline"
              color={item.read === 0 ? '#38a3a5' : '#8d99ae'}
              size={24}
            />
          )}
          right={props => (
            <TouchableOpacity
              onPress={() => handleClickItem(item?.id)}
              // disabled={item.read === 0 ? false : true}
            >
              <IconView
                name="checkmark-done"
                color={item.read === 0 ? '#f07167' : '#6d6875'}
                size={24}
              />
            </TouchableOpacity>
          )}
        />
        <Divider />
      </>
    );
  };

  const renderNoty = useMemo(() => {
    return (
      <>
        <FlatList
          data={notify}
          initialNumToRender={20}
          renderItem={(item: any) => renderItemNoty(item?.item)}
        />
      </>
    );
  }, [notify, userState?.notify]);

  const renderNewNotify = useMemo(() => {
    return (
      <Text style={styles.topTitleNumber}>
        Thông báo mới: {userState?.notify ? userState?.notify : 0}
      </Text>
    );
  }, [userState?.notify]);
  return (
    <View style={styles.containner}>
      <AlertNotificationRoot>
        <Header
          title="Thông báo"
          iconLeft={true}
          home={false}
          style={styles.header}
          back={true}
          iconRight={true}></Header>

        <View style={styles.notyContent}>
          <View style={styles.top}>
            {renderNewNotify}

            <TouchableOpacity
              style={styles.topBtn}
              onPress={() => handleReadAllNotify()}>
              <Text style={styles.topTitle}>Đánh dấu tất cả là đã đọc</Text>
              <IconView
                name="checkmark-done"
                color={Colors.textPrimary}
                size={24}
              />
            </TouchableOpacity>
          </View>

          {renderNoty}
        </View>

        {/* <NoneData icon title="Chưa có thông báo nào"></NoneData> */}
      </AlertNotificationRoot>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  notyContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  top: {
    paddingTop: responsiveHeight(20),
    height: responsiveHeight(60),
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(10),
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  topBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    display: 'flex',
  },
  topTitleNumber: {
    textAlign: 'right',
    fontSize: responsiveFont(15),
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#f4978e',
  },
  topTitle: {
    fontWeight: '600',
    textAlign: 'right',
    fontSize: responsiveFont(15),

    color: '#31572c',
  },
  itemTitle: {
    fontSize: responsiveFont(15),
  },
  itemContent: {
    paddingHorizontal: responsiveWidth(10),
  },
});
