import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {useAppSelector} from '../../../redux/hooks';
import majorService from '../../../services/major';
import Lecturer from '../../../utilities/Contant/Lecturer';
import {List} from 'react-native-paper';
import IconView from '../../../common/IconView';
import {FlatList} from 'react-native-gesture-handler';
import {Images} from '../../../assets/images/Images';
import {checkDegree, checkGenger, checkRole} from '../../../utilities/contants';
import {isEmpty} from '../../../utilities/utils';

const LectureMenu = () => {
  const majorState = useAppSelector(state => state.major.major);
  const [lecturer, setLecturer] = useState<Lecturer[]>();

  useEffect(() => {
    getLecturersOfmajor();
  }, [majorState]);

  const getLecturersOfmajor = async () => {
    if (!isEmpty(majorState?.id)) {
      await majorService
        .getLecturerByMajor(Number(majorState?.id))
        .then(result => {
          setLecturer(result?.data);
        });
    }
  };

  const rednderItem = (item: any) => {
    console.log(' rednderItem', item);

    const LECTURER_DATA = [
      {name: item.avatar, key: ''},
      {name: checkRole(item.role), key: 'Chức vụ'},
      {name: item.name, key: 'Tên Giảng viên'},
      {name: checkGenger(item.gender), key: 'Giới tính'},
      {name: item.phoneNumber, key: 'Số điện thoại'},
      {name: checkDegree(item.degree), key: 'Trình độ'},
      {name: item.email, key: 'Email'},
    ];

    return (
      <>
        <View style={styles.contentListItem}>
          {LECTURER_DATA.map((i, index) => {
            if (i?.key === '') {
              return (
                <>
                  <List.Item
                    title={
                      <>
                        <Text numberOfLines={1} style={[styles.titleMain]}>
                          Mã giảng viên
                        </Text>
                      </>
                    }
                    description={
                      <View style={styles.contenItem}>
                        <Text numberOfLines={1} style={[styles.titleGroup]}>
                          {item?.username}
                        </Text>
                      </View>
                    }
                    left={props => (
                      <Image
                        source={i?.name ? {uri: i?.name} : Images.avatar}
                        style={styles.imgaAvatar}
                      />
                    )}
                  />
                </>
              );
            }
            return (
              <>
                <List.Item
                  key={index}
                  title={
                    <>
                      <Text numberOfLines={1} style={[styles.titleMain]}>
                        {i?.key}
                      </Text>
                    </>
                  }
                  description={
                    <View style={styles.contenItem}>
                      <Text numberOfLines={1} style={[styles.titleGroup]}>
                        {i?.name}
                      </Text>
                    </View>
                  }
                  left={props => <View style={styles.iconContentView}></View>}
                />
              </>
            );
          })}
        </View>
      </>
    );
  };

  const renderLecturerInfo = useMemo(() => {
    return (
      <>
        <FlatList
          horizontal={true}
          data={lecturer}
          renderItem={item => rednderItem(item?.item)}
        />
      </>
    );
  }, [lecturer]);
  return (
    <>
      <View style={GlobalStyles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.primaryButton}
        />

        <View style={styles.containner}>
          <Header
            title="Giảng viên"
            iconLeft={true}
            home={false}
            style={styles.header}
            back={true}
            iconRight={true}></Header>

          <View style={styles.content}>
            <View style={[styles.listTitle, GlobalStyles.centerView]}>
              <Text style={styles.contentName}>Chuyên ngành</Text>
              <Text style={styles.contentName}>{majorState?.name}</Text>
            </View>
            {renderLecturerInfo}
          </View>
        </View>
      </View>
    </>
  );
};

export default LectureMenu;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  content: {
    flex: 1,
    marginVertical: responsiveHeight(20),
    borderTopRightRadius: 10,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listTitle: {
    borderRadius: 3,
    flexDirection: 'column',
    // backgroundColor: '#a3b18a',

    width: '100%',
    paddingVertical: responsiveHeight(10),
    shadowOffset: {width: 2, height: 3},
  },
  contentName: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',

    textTransform: 'uppercase',
  },
  contentListItem: {
    flexDirection: 'column',
    width: responsiveWidth(330),
    borderRadius: 5,
    marginHorizontal: responsiveWidth(10),
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
  },
  titleMain: {
    fontSize: responsiveFont(18),
    color: Colors.textPrimary,
  },
  title: {
    fontSize: responsiveFont(18),
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  lecturerName: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
  },
  viewIcon: {
    borderRadius: 10,
    borderColor: '#a3b18a',
    marginLeft: responsiveWidth(10),
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(15),
    textTransform: 'uppercase',
  },
  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    margin: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  iconContentView: {
    margin: 5,
  },
  contenItem: {},
});
