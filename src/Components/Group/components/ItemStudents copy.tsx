import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Header from '../../../common/Header';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {useAppSelector} from '../../../redux/hooks';
import IconView from '../../../common/IconView';
import GroupItem from './GroupItem';
import authService from '../../../services/auth';
import StudentOfList from './StudentOfList';
import {isEmpty} from 'lodash';
import groupService from '../../../services/group';
import {TypeRequestGroup} from '../../../utilities/contants';

const ItemStudents = () => {
  const termState = useAppSelector(state => state.term);
  const [students, setStudents] = useState();

  const [index, setIndex] = useState(0);

  const getListStdentsNonGroup = useCallback(async () => {
    if (termState?.term?.id) {
      await authService
        .getStudent(termState?.term?.id, false)
        .then(result => {
          setStudents(result.data);
        })
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    getListStdentsNonGroup();
  }, [termState]);

  const renderListStudents = useMemo(
    () => (item: any) => {
      return (
        <StudentOfList termInfoGroup={termState?.term} studentInfo={item} />
      );
    },
    [],
  );

  const ListStudents = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            {/* <View style={styles.contentTitle}>
              <View style={styles.viewIcon}>
                <IconView
                  name="people-ouline"
                  color={Colors.iconbr}
                  size={26}
                />
              </View>
              <Text style={styles.titleGroup}>
                Danh sách sinh viên chưa có nhóm
              </Text>
              <Lottie
                source={require('../../../assets/jsonAmination/62114-people-icons-lottie-animation.json')}
                autoPlay
                loop
                style={styles.amination}
              />
            </View> */}

            <View style={[styles.flatList]}>
              <FlatList
                data={students}
                initialNumToRender={20}
                renderItem={(item: any) => renderListStudents(item?.item)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [students]);
  return (
    <>
      <View style={GlobalStyles.container}>
        <View style={styles.containner}>
          <Header
            title="Danh sách sinh viên"
            iconLeft={true}
            home={false}
            style={styles.header}
            back={true}
            iconRight={false}></Header>

          {ListStudents}
        </View>
      </View>
    </>
  );
};

export default ItemStudents;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  bottomContent: {
    alignItems: 'flex-start',
    height: '90%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    shadowOffset: {width: 2, height: 3},
  },

  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
  },
  viewIcon: {
    borderRadius: 10,
    backgroundColor: '#dda15e',
    borderColor: '#ff9f1c',
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  viewIconGroup: {
    backgroundColor: '#fdffb6',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(10),
    marginRight: responsiveWidth(10),
  },
  contentTitle: {
    width: '100%',
    paddingHorizontal: responsiveWidth(16),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: responsiveHeight(8),
    backgroundColor: '#a2d2ff',
  },
  flatList: {
    width: '100%',
    height: '75%',
  },
  amination: {
    right: responsiveWidth(-150),
  },
});
