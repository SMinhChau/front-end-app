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
import {useNavigation} from '@react-navigation/native';
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
import {MENU} from './content';
import {navigate} from '../utils';
import topicAPI from '../../redux/apis/topic';

const Group: React.FC<{}> = () => {
  const groupState = useAppSelector(state => state.group);
  const termState = useAppSelector(state => state.term);

  const [checkStartDate, setcheckStartDate] = useState(false);

  const [topic, setTopic] = useState<Topic>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

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

    getInfoGroup();
  }, [checkStartDate, termState, groupState]);

  const GroupView = useMemo(() => {
    return (
      <>
        {groupState?.group?.name ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={[styles.content]}>
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
              style={[styles.content]}>
              <View style={styles.viewIcon}>
                <IconView name="md-duplicate" color={Colors.iconbr} size={26} />
              </View>
              <View style={[styles.menuText, GlobalStyles.centerView]}>
                <Text numberOfLines={2} style={styles.topTitle}>
                  Tạo nhóm mới
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  }, [groupState, topic]);

  const getInfoGroup = () => {
    dispatch(topicAPI.getTopicById()(groupState?.group?.topic?.id as number));
  };

  const renderMenuItem = (item: any, index: any) => {
    if (item?.key === 'group') {
      return <>{GroupView}</>;
    }
    return (
      <>
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item?.navigate)}
          style={[styles.content]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: item?.backgroupIcon
                  ? item?.backgroupIcon
                  : '#dda15e',
                borderColor: item?.borderIcon ? item?.borderIcon : '#ff9f1c',
              },
            ]}>
            <IconView name={item?.icon} color={item?.iconColor} size={26} />
          </View>
          <View style={[styles.menuText, GlobalStyles.centerView]}>
            <Text numberOfLines={2} style={styles.topTitle}>
              {item?.title}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Header title="Nhóm" iconRight={true}></Header>
      <View style={[GlobalStyles.container, styles.container]}>
        {checkStartDate ? (
          <View style={styles.menu}>
            <FlatList
              numColumns={3}
              data={MENU}
              renderItem={({item, index}) => renderMenuItem(item, index)}
            />
          </View>
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
  container: {
    backgroundColor: Colors.bg,
    paddingHorizontal: responsiveWidth(10),
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: responsiveHeight(120),
    width: responsiveWidth(110),
    paddingVertical: responsiveHeight(10),
    shadowOffset: {width: 2, height: 3},
    marginVertical: responsiveHeight(20),
    marginRight: responsiveWidth(10),
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
    textAlign: 'center',
    fontWeight: '400',
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
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    width: '95%',
  },
});
