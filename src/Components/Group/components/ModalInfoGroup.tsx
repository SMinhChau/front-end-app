import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import CloseButton from '../../../common/CloseButton';
import IconView from '../../../common/IconView';
import languages from '../../../languages';
import Colors from '../../../Themes/Colors';
import Group from '../../../utilities/Contant/Group';
import User from '../../../utilities/contants';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import TextItemAccount from '../../Account/component/TextItemAccount';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import Topic from '../../../utilities/Contant/Topic';
import topicService from '../../../services/topic';
import NoneData from '../../Section/NoneData';
import ButtonView from '../../../common/ButtonView';
import ButtonHandle from '../../../common/ButtonHandle';
import {log} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {Images} from '../../../assets/images/Images';
import groupService from '../../../services/group';
import groupAPI from '../../../redux/apis/group';
import {GroupSlices} from '../../../redux/slices/GroupSlices';
import Term from '../../../utilities/Contant/Term';

interface Props {
  title: string;
  onPressClose: () => void;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
  infoGroup: Group;
  topicInfo: Topic;
  visible: any;
  termInfoGroup: Term;
}
interface Member {
  id: number;
  student: {
    id: number;
    username: string;
    avatar: string;
    phoneNumber: string;
    email: string;
    name: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
    majors: {
      id: number;
    };
    typeTraining: string;
    schoolYear: string;
  };
  group: {
    id: number;
  };
}

const ModalInfoGroup: React.FC<Props> = ({
  title,
  onPressClose,
  modalClose,
  infoGroup,
  topicInfo,
  visible,
  termInfoGroup,
}) => {
  const [listMember, setListMember] = useState<[Member]>();
  const [term, setTerm] = useState<Term>();
  const [topic, setTopic] = useState<Topic>();
  const groupState = useAppSelector(state => state.group);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('infoGroup?.members', infoGroup?.members);
    console.log('topicInfo?', topicInfo);
    console.log('groupState?', groupState);
    setListMember(infoGroup?.members);
    setTopic(topicInfo);
    setTerm(termInfoGroup);
  }, [listMember, topic, groupState, term]);

  // const getTopicForGroup = useCallback(() => {
  //   console.log('getTopicForGroup>>.. result');
  //   topicService
  //     .getMajorById(infoGroup?.topic?.id ? infoGroup?.topic?.id : 3)
  //     .then(result => {
  //       console.log('getTopicForGroup>>.. result', result);
  //       setTopic(result?.data);
  //     })
  //     .catch(error => console.log('getTopicForGroup>>.. error', error));
  // }, [topic]);

  const renderListMember = useMemo(
    () => (item: any) => {
      return (
        <View style={styles.contenMember}>
          <View style={styles.leftContent}>
            <Lottie
              source={require('../../../assets/jsonAmination/88012-student-animated-icon.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.rightContent}>
            <TextItemAccount
              textLeft={languages['vi'].code}
              textRight={item?.student?.username}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].name}
              textRight={item?.student?.name}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].gender}
              textRight={
                item?.student?.gender === 'male' ? 'Nam' : 'Nữ'
              }></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].numberPhone}
              textRight={item?.student?.phoneNumber}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].email}
              textRight={item?.student?.email}></TextItemAccount>
          </View>
        </View>
      );
    },
    [],
  );

  const renderInfoTopic = useMemo(() => {
    return (
      <>
        {topic?.id ? (
          <View style={styles.contenTopic}>
            <TextItemAccount
              textLeft={languages['vi'].nameTopic}
              textRight={topic?.name}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].description}
              textRight={topic?.description}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].requireInput}
              textRight={topic?.requireInput}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].standradOutput}
              textRight={topic?.standradOutput}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].target}
              textRight={topic?.target}></TextItemAccount>
            <TextItemAccount
              textLeft={languages['vi'].status}
              textRight={topic?.status}></TextItemAccount>
            {/* </View> */}
          </View>
        ) : (
          <NoneData icon title="Nhóm của bạn chưa có Đề tài"></NoneData>
        )}
      </>
    );
  }, [topic]);

  const handleOutGroup = (id: any) => {
    console.log('handleOutGroup id', id);
    dispatch(groupAPI.outMyGroup()(id)).then(result => {
      console.log('handleCreatgroup result', result);

      Alert.alert('Thông báo', 'Đã xóa nhóm thành công');
      modalClose(false);
    });

    // dispatch(GroupSlices.actions.updateOutedGroup(true));
  };

  const renderButton = useMemo(() => {
    return (
      <View style={styles.contentBtn}>
        {groupState?.group?.id === infoGroup?.id ? (
          <ButtonHandle
            icon
            onPress={() => handleOutGroup(term?.id)}
            title="Rời nhóm"
            style={styles.buttonOut}
          />
        ) : (
          <ButtonHandle icon title="Tham gia nhón" style={styles.buttonJoin} />
        )}
      </View>
    );
  }, [infoGroup, groupState]);

  const renderViewInfo = useMemo(() => {
    return (
      <View style={styles.contentTitle}>
        <View style={styles.nameGroup}>
          <IconView name="ios-caret-forward" color={Colors.iconbr} size={26} />
          <Text numberOfLines={1} style={styles.titleGroup}>
            {infoGroup?.name}
          </Text>
        </View>

        <Text style={[styles.titleGroup, {marginTop: 5}]}>
          Thông tin sinh viên
        </Text>
        {listMember?.length ? (
          <View style={[styles.flatList]}>
            <FlatList
              data={listMember}
              contentContainerStyle={{
                width: '100%',
              }}
              renderItem={(item: any) => renderListMember(item?.item)}
            />
          </View>
        ) : (
          <NoneData icon title="Nhóm không có sinh viên"></NoneData>
        )}

        {/* {topic?.id ? 
          {renderInfoTopic}
         : (
          <>
            <NoneData icon title="Nhóm của bạn chưa có Đề tài"></NoneData>
          </>
        )} */}
      </View>
    );
  }, [listMember]);

  return (
    <Portal>
      <Modal visible={visible} style={{height: '100%'}}>
        <View style={{backgroundColor: Colors.white}}>
          <Text style={styles.title}>{title}</Text>
          <CloseButton style={styles.logo} onPress={() => modalClose(false)} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            {renderViewInfo}

            <Text style={[styles.titleGroup]}>Thông tin Đề tài</Text>

            {renderInfoTopic}
            {renderButton}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};
export default ModalInfoGroup;

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    margin: responsiveHeight(20),
  },
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  contentTitle: {
    width: '100%',
    // height: '100%',
    // borderColor: '#caf0f8',
    // borderWidth: 1,
    // shadowOpacity: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: 10,
  },
  nameGroup: {
    borderColor: '#ff9f1c',
    borderWidth: 1,
    shadowOpacity: 3,
    borderBottomStartRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: responsiveHeight(10),
    flexDirection: 'row',
    backgroundColor: '#80b918',
  },
  viewIcon: {
    backgroundColor: '#dda15e',

    paddingHorizontal: responsiveWidth(9),
    paddingVertical: responsiveHeight(9),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '500',
    paddingHorizontal: responsiveWidth(10),
    textTransform: 'uppercase',
  },
  flatList: {
    width: '100%',
    // height: '80%',
    flex: 1,
  },
  contenMember: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    shadowOpacity: 3,
    backgroundColor: '#cbdfbd',
    borderRadius: 10,
    borderColor: '#76c893',

    marginTop: responsiveHeight(10),
  },
  contenTopic: {
    // width: '100%',
    borderWidth: 1,
    shadowOpacity: 3,
    backgroundColor: '#98c1d9',
    borderRadius: 10,
    borderColor: '#669bbc',
    paddingHorizontal: responsiveWidth(10),
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(10),
  },
  leftContent: {
    width: '25%',
  },
  rightContent: {
    width: '75%',
    paddingVertical: responsiveHeight(10),
  },
  buttonOut: {
    backgroundColor: Colors.red,
  },
  buttonJoin: {
    backgroundColor: '#38b000',
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
});
