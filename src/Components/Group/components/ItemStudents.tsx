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

import groupService from '../../../services/group';
import {TypeRequestGroup} from '../../../utilities/contants';
import StudentOfList from './content/StudentOfList';
import {log} from 'react-native-reanimated';
interface ListInvited {
  id: number;
  message: string;
  type: string;
  group: {
    id: number;
  };
  student: {
    id: number;
  };
}
const ItemStudents = () => {
  const termState = useAppSelector(state => state.term);
  const [students, setStudents] = useState([]);
  const [studentsHaveGroup, setStudentsHaveGroup] = useState();

  const [flag, setFlag] = useState(false);
  const [listStudentInvitedJoinGroup, setStudentInvitedJoinGroup] =
    useState<ListInvited[]>();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'not', title: 'Chưa có nhóm'},
    {key: 'have', title: 'Đã có nhóm'},
  ]);

  const getListStdentsNonGroup = useCallback(
    async (listStudentInvited: any[]) => {
      if (termState?.term?.id) {
        await authService
          .getStudent(termState?.term?.id, false)
          .then(result => {
            console.log('listStudentInvited', listStudentInvited);

            const checkInvited = (item: {id: number}) =>
              listStudentInvited?.find(
                (studentGroup: {student: {id: number}}) =>
                  studentGroup?.student?.id === item.id,
              );

            const resultTemp = result?.data.map((item: any) => ({
              ...item,
              invited: !!checkInvited(item),
            }));
            setStudents(resultTemp);
          })
          .catch(error => console.log(error));
      }
    },
    [],
  );

  const getListStdentsHaveGroup = useCallback(async () => {
    if (termState?.term?.id) {
      await authService
        .getStudent(termState?.term?.id, true)
        .then(result => {
          setStudentsHaveGroup(result.data);
        })
        .catch(error => console.log(error));
    }
  }, []);

  useEffect(() => {
    const initData = async () => {
      await getListStdentsHaveGroup();
    };
    initData();
  }, []);

  useEffect(() => {
    getListInvitedJoinGroup();
  }, []);

  const getListInvitedJoinGroup = () => {
    if (termState?.term?.id) {
      groupService
        .getMyrequestJoinGroup(
          termState?.term?.id,
          TypeRequestGroup.REQUEST_INVITE,
        )
        .then(async result => {
          console.log('>>>>>getListInvitedJoinGroup', result?.data);

          setStudentInvitedJoinGroup(result?.data);
          await getListStdentsNonGroup(result?.data);
        })
        .catch(error => console.log('error', error));
    }
  };

  const renderListStudents = (item: any) => {
    console.log('item', item);

    return (
      <StudentOfList
        notGroup
        isStudentInvited={item?.invited}
        termInfoGroup={termState?.term}
        studentInfo={item}
      />
    );
  };

  const renderListStudentsHaveGroup = (item: any) => {
    return <StudentOfList termInfoGroup={termState?.term} studentInfo={item} />;
  };

  const TabStudentNotGroup = () => {
    return <>{ListStudents}</>;
  };
  const TabStudentHaveGroup = () => {
    return <>{ListStudentsHaveGroup}</>;
  };

  const renderScene = SceneMap({
    not: TabStudentNotGroup,
    have: TabStudentHaveGroup,
  });

  const ListStudents = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={students}
                renderItem={(item: any) => renderListStudents(item?.item)}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [students]);

  const ListStudentsHaveGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={[styles.flatList]}>
              <FlatList
                data={studentsHaveGroup}
                renderItem={(item: any) =>
                  renderListStudentsHaveGroup(item?.item)
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [studentsHaveGroup]);
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

          {/* {ListStudents} */}
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
        </View>
      </View>
    </>
  );
};

export default ItemStudents;

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
    height: '85%',
  },
  amination: {
    right: responsiveWidth(-150),
  },
});
