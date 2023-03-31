import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  useWindowDimensions,
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
import groupService from '../../../services/group';
import {TypeRequestGroup} from '../../../utilities/contants';
import ContentItemInvite from './content/ContentItemInvite';
import {isEmpty} from '../../../utilities/utils';

const InviteJoinGroup = () => {
  const layout = useWindowDimensions();
  const [listInvitedToStudent, setListInvitedToStudent] = useState();
  const [listInviteReceidFromStudent, setInviteReceidFromStudent] = useState();

  const termState = useAppSelector(state => state.term);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'send', title: 'Gửi Đến Sinh Viên'},
    {key: 'receid', title: 'Nhận Từ Sinh Viên'},
  ]);

  useEffect(() => {
    listInvited();
  }, [termState]);

  const listInvited = async () => {
    if (!isEmpty(termState?.term?.id)) {
      await groupService
        .getMyrequestJoinGroup(
          termState?.term?.id,
          TypeRequestGroup.REQUEST_INVITE,
        )
        .then(result => {
          setListInvitedToStudent(result?.data);
        })
        .catch(error => console.log('error', error));
    }
  };

  const InvitedStudentJionGroup = () => {
    return <>{renderInvitedStudentJionGroup}</>;
  };
  const ReciedRequestionGroup = () => {
    return <>{renderReciedRequestionGroup}</>;
  };

  const renderScene = SceneMap({
    send: InvitedStudentJionGroup,
    receid: ReciedRequestionGroup,
  });

  const renderStudentJionGroup = (item: any) => {
    return (
      <ContentItemInvite
        studentName={item?.student?.name}
        message={item?.message}
      />
    );
  };

  const renderInvitedStudentJionGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={listInvitedToStudent}
                initialNumToRender={20}
                renderItem={(item: any) => renderStudentJionGroup(item?.item)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [listInvitedToStudent]);

  const renderReciedRequestionGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={listInviteReceidFromStudent}
                initialNumToRender={20}
                renderItem={(item: any) => renderStudentJionGroup(item?.item)}
                keyExtractor={item => item.id}
              />
              <Text>hjnhkljn</Text>
            </View>
          </View>
        </>
      </>
    );
  }, [listInviteReceidFromStudent]);
  return (
    <>
      <View style={GlobalStyles.container}>
        <View style={styles.containner}>
          <Header
            title="Yêu cầu tham gia nhóm"
            iconLeft={true}
            home={false}
            style={styles.header}
            back={true}
            iconRight={false}></Header>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={styles.contentTab}
            initialLayout={{width: layout.width}}
          />
        </View>
      </View>
    </>
  );
};

export default InviteJoinGroup;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Colors.white,
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
  contentTab: {},
});
