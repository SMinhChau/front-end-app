import {is} from 'immer/dist/internal';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Lottie from 'lottie-react-native';
import Header from '../../common/Header';
import IconView from '../../common/IconView';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';
import languages from '../../languages';
import groupAPI from '../../redux/apis/group';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {TermSlices} from '../../redux/slices/TermSlices';
import groupService from '../../services/group';
import Colors from '../../Themes/Colors';
import User from '../../utilities/contants';

import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';
import NoneData from '../Section/NoneData';
import GroupItem from './components/GroupItem';
import ModalInfoGroup from './components/ModalInfoGroup';
import topicService from '../../services/topic';
import Topic from '../../utilities/Contant/Topic';
import {To} from 'react-router-dom';
import ModelCreateGroup from './components/ModelCreateGroup';
import {GroupSlices} from '../../redux/slices/GroupSlices';
import {isEmpty} from 'lodash';
import termrAPI from '../../redux/apis/term';

const Group: React.FC<{}> = () => {
  const groupState = useAppSelector(state => state.group);
  const termState = useAppSelector(state => state.term);
  const userState = useAppSelector(state => state.user);

  const [checkStartDate, setcheckStartDate] = useState(false);
  const [listGroup, setListGroup] = useState();
  const [topic, setTopic] = useState<Topic>();
  const isOuted = useAppSelector(state => state.group.is_outed);

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showModalCreateGroup, setShowModalCreateGroup] = useState(false);

  const checkTermStart = () => {
    const start = new Date(termState?.term?.startDate);
    const nowDate = new Date();
    if (start < nowDate) {
      setcheckStartDate(true);
    }
  };

  useEffect(() => {
    checkTermStart();

    getListGroup();

    getInfoGroup();
  }, [checkStartDate, termState, groupState]);

  const getListGroup = useCallback(async () => {
    if (termState?.term?.id) {
      await groupService
        .getListGroup(termState?.term?.id)
        .then(result => {
          console.log('getListGroup', result.data);

          setListGroup(result.data);
        })
        .catch(error => console.log(error));
    }
  }, [groupState]);

  const GroupView = useMemo(() => {
    return (
      <>
        {groupState?.group?.name ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={[styles.content, GlobalStyles.margin20]}>
              <View style={styles.viewIcon}>
                <IconView
                  name="md-grid-outline"
                  color={Colors.iconbr}
                  size={26}
                />
              </View>
              <Text style={styles.topTitle}>Xem thông tin nhóm</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowModalCreateGroup(true)}
              style={[styles.content, GlobalStyles.margin20]}>
              <View style={styles.viewIcon}>
                <IconView
                  name="md-grid-outline"
                  color={Colors.iconbr}
                  size={26}
                />
              </View>
              <Text style={styles.topTitle}>Tạo nhóm mới</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  }, [groupState, topic]);

  const renderGroupList = useMemo(
    () => (item: any) => {
      return <GroupItem termInfoGroup={termState?.term} groupInfo={item} />;
    },
    [],
  );

  const getTopicForGroup = useCallback((id: any) => {
    topicService
      .getTopicId(id)
      .then(result => {
        setTopic(result?.data);
      })
      .catch(error => console.log('getTopicForGroup>>.. error', error));
  }, []);

  const ListGroup = useMemo(() => {
    return (
      <>
        <>
          <View style={[styles.bottomContent]}>
            <View style={styles.contentTitle}>
              <View style={styles.viewIcon}>
                <IconView name="people-sharp" color={Colors.iconbr} size={26} />
              </View>
              <Text style={styles.titleGroup}>Danh sách nhóm</Text>
              <Lottie
                source={require('../../assets/jsonAmination/62114-people-icons-lottie-animation.json')}
                autoPlay
                loop
                style={styles.amination}
              />
            </View>

            <View style={[styles.flatList]}>
              <FlatList
                data={listGroup}
                initialNumToRender={20}
                renderItem={(item: any) => renderGroupList(item?.item)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </>
      </>
    );
  }, [listGroup, groupState]);

  const getInfoGroup = () => {
    getTopicForGroup(
      groupState?.group?.topic?.id ? groupState?.group?.topic?.id : null,
    );
  };

  return (
    <>
      <View style={[GlobalStyles.container]}>
        <Header title="Nhóm" iconRight={true}></Header>

        {checkStartDate ? (
          <>
            {GroupView}

            {ListGroup}
          </>
        ) : (
          <NoneData icon title="Chưa đến thời gian chọn nhóm"></NoneData>
        )}

        <ModalInfoGroup
          visible={showModal}
          infoGroup={groupState?.group}
          title={'Thông tin nhóm'}
          topicInfo={topic as Topic}
          termInfoGroup={termState?.term}
          modalClose={setShowModal}></ModalInfoGroup>

        <ModelCreateGroup
          visible={showModalCreateGroup}
          title={'Tạo nhóm'}
          termCreateGroup={termState?.term}
          modalClose={setShowModalCreateGroup}></ModelCreateGroup>
      </View>
    </>
  );
};
export default Group;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    borderWidth: 1,

    shadowOpacity: 3,
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(16),
    shadowOffset: {width: 2, height: 3},
  },
  bottomContent: {
    alignItems: 'flex-start',
    height: '90%',
    backgroundColor: Colors.white,
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(20),
    shadowOffset: {width: 2, height: 3},
  },

  topTitle: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    paddingHorizontal: responsiveWidth(10),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
  },
  viewIcon: {
    backgroundColor: '#dda15e',
    borderRadius: 10,
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
