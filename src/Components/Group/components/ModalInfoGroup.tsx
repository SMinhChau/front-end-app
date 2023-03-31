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
import {Button, Dialog, Modal, Portal, TextInput} from 'react-native-paper';
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
import {GroupSlices, setLoading} from '../../../redux/slices/GroupSlices';
import Term from '../../../utilities/Contant/Term';
import {isEmpty} from '../../../utilities/utils';
import LoadingScreen from '../../../common/LoadingScreen';
interface Props {
  title?: string;
  onPressClose?: () => void;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  children?: any;
  infoGroup?: Group;
  topicInfo?: Topic;
  visible?: any;
  termInfoGroup?: Term;
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
  modalClose,
  infoGroup,
  topicInfo,
  visible,
  termInfoGroup,
}) => {
  const [listMember, setListMember] = useState<Member[]>();

  const [topic, setTopic] = useState<Topic>();
  const groupState = useAppSelector(state => state.group);
  const [loading, setLoading] = useState(false);
  const [isRequest, setRequest] = useState(false);

  const [modalRequestToJoinGroup, seModalRequestToJoinGroup] = useState(false);

  const hideDialog = () => seModalRequestToJoinGroup(false);

  const dispatch = useAppDispatch();

  const [content, SetContent] = useState('');

  const onChangeText = (text: string) => {
    SetContent(text);
  };

  console.log('>>>>>>>>>>>>>>>>infoGroup?.members', infoGroup?.members);

  useEffect(() => {
    setListMember(infoGroup?.members);
    setTopic(topicInfo);
  });

  const handleOutGroup = (id: any) => {
    setLoading(true);
    dispatch(groupAPI.outMyGroup()(id)).then(result => {
      setLoading(false);
      Alert.alert('Thông báo', 'Đã xóa nhóm thành công');
      modalClose(false);
    });
  };

  const handleSentRequestJoinGroup = async () => {
    seModalRequestToJoinGroup(true);
  };

  const sendRequestToGroup = async () => {
    console.log('>>>>>>>>>>>>>>content', content);
    setRequest(true);
    await groupService
      .sendRequestGroup(infoGroup?.id as number, content)
      .then(result => {
        console.log('sendRequestGroup result ====', result);
        setRequest(false);
        Alert.alert('Thông báo', 'Đã gửi yêu cầu tham gia nhóm');
        seModalRequestToJoinGroup(false);
        modalClose(false);
      })
      .catch(error => {
        setRequest(false);
        Alert.alert('Thông báo', 'Gửi yêu cầu thất bại');
        seModalRequestToJoinGroup(false);
        modalClose(false);
      });
  };

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
    [listMember],
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
          <NoneData icon title="Nhóm chưa có Đề tài"></NoneData>
        )}
      </>
    );
  }, [topic]);

  const renderButton = useMemo(() => {
    return (
      <View style={styles.contentBtn}>
        {groupState?.group?.id === infoGroup?.id ? (
          <ButtonHandle
            icon
            onPress={() => handleOutGroup(termInfoGroup?.id)}
            title="Rời nhóm"
            style={styles.buttonOut}
          />
        ) : (
          <>
            {groupState?.group?.id ? null : (
              <ButtonHandle
                onPress={() => handleSentRequestJoinGroup()}
                icon
                title="Tham gia nhón"
                style={styles.buttonJoin}
              />
            )}
          </>
        )}
      </View>
    );
  }, [infoGroup, groupState]);

  const renderViewInfo = useMemo(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>renderViewInfo listMember', listMember);

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
              horizontal={true}
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
            <NoneData icon title="Nhóm chưa có Đề tài"></NoneData>
          </>
        )} */}
      </View>
    );
  }, [listMember]);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          style={{height: '100%', marginHorizontal: responsiveWidth(10)}}>
          <View style={{backgroundColor: Colors.white}}>
            <Text style={styles.title}>{title}</Text>
            <CloseButton
              style={styles.logo}
              onPress={() => modalClose(false)}
            />
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

      {loading && <LoadingScreen />}
      {isRequest && <LoadingScreen />}

      <Portal>
        <Dialog visible={modalRequestToJoinGroup} onDismiss={hideDialog}>
          <Dialog.Title>Gửi yêu cầu tham gia nhóm</Dialog.Title>

          <Dialog.Content>
            <TextInput
              placeholder={'Nội dung'}
              onChangeText={text => onChangeText(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => seModalRequestToJoinGroup(false)}>
              Hủy
            </Button>
            <ButtonHandle
              onPress={() => sendRequestToGroup()}
              icon
              iconName="paper-plane-outline"
              title="Gửi"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
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
    width: responsiveWidth(300),
    flexDirection: 'column',
  },
  contenMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowOpacity: 3,
    backgroundColor: '#cbdfbd',
    borderRadius: 10,
    borderColor: '#76c893',
    width: '100%',
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
    width: responsiveWidth(70),
  },
  rightContent: {
    width: responsiveWidth(260),
    paddingVertical: responsiveHeight(10),
  },
  buttonOut: {
    backgroundColor: Colors.red,
  },
  buttonJoin: {
    backgroundColor: '#38b000',
  },
  buttonSent: {
    backgroundColor: Colors.primaryButton,
  },
  contentBtn: {
    paddingHorizontal: responsiveWidth(16),
    backgroundColor: Colors.white,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(20),
  },
});
