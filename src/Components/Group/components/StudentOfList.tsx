import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  Modal,
  Portal,
  TextInput,
} from 'react-native-paper';
import {Images} from '../../../assets/images/Images';
import ButtonHandle from '../../../common/ButtonHandle';
import CloseButton from '../../../common/CloseButton';
import IconView from '../../../common/IconView';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import languages from '../../../languages';
import {useAppSelector} from '../../../redux/hooks';
import groupService from '../../../services/group';
import topicService from '../../../services/topic';
import Colors from '../../../Themes/Colors';
import Group from '../../../utilities/Contant/Group';
import Term from '../../../utilities/Contant/Term';
import Topic from '../../../utilities/Contant/Topic';
import User from '../../../utilities/contants';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import {isEmpty} from '../../../utilities/utils';
import TextItemAccount from '../../Account/component/TextItemAccount';
import ModalInfoGroup from './ModalInfoGroup';

interface Props {
  title?: string;
  icon?: boolean;
  onPress?: () => void;
  handleJoin?: () => void;
  notGroup?: boolean;
  join?: boolean;
  studentInfo?: User;
  termInfoGroup?: Term;
}
const StudentOfList: React.FC<Props> = ({studentInfo, notGroup}) => {
  const [visible, setVisible] = useState(false);
  const groupState = useAppSelector(state => state.group);
  const termState = useAppSelector(state => state.term);
  const [content, SetContent] = useState('');
  const [isInvite, setInvite] = useState(false);
  const [modalInviteStudentJionGtoup, setModalInviteStudentJionGtoup] =
    useState(false);

  const onChangeText = (text: string) => {
    SetContent(text);
  };

  const DATA = [
    {
      key: languages['vi'].code,
      title: studentInfo?.username,
    },
    {
      key: languages['vi'].name,
      title: studentInfo?.name,
    },
    {
      key: languages['vi'].gender,
      title: studentInfo?.gender === 'male' ? 'Nam' : 'Nữ',
    },
    {
      key: languages['vi'].numberPhone,
      title: studentInfo?.phoneNumber,
    },
    {
      key: languages['vi'].email,
      title: studentInfo?.email,
    },
  ];

  const sendInviteToStudent = async () => {
    setInvite(true);
    await groupService
      .inviteStudentJoinMyGroup(
        termState?.term?.id,
        studentInfo?.id as string,
        content,
      )
      .then(result => {
        console.log('sendInviteToStudent result ====', result);
        setInvite(false);
        Alert.alert('Thông báo', 'Đã gửi lời mời tham gia nhóm');
        setModalInviteStudentJionGtoup(false);
      })
      .catch(error => {
        console.log('sendInviteToStudent error', error);
        setInvite(false);
        Alert.alert('Thông báo', 'Lời mời tham gia nhóm chưa được gửi');
        setModalInviteStudentJionGtoup(false);
      });
  };

  const topContent = useMemo(() => {
    return (
      <>
        <View style={[GlobalStyles.margin20, styles.contentTitle]}>
          <Image
            source={{
              uri: studentInfo?.avatar ? studentInfo?.avatar : Images.avatar,
            }}
            style={styles.imgaAvatar}
          />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '80%',
            }}>
            <View style={styles.content}>
              {DATA.map((item: any, index: any) => {
                return (
                  <>
                    <TextItemAccount
                      key={index}
                      main={true}
                      textLeft={item?.key}
                      textRight={item?.title}></TextItemAccount>
                  </>
                );
              })}
            </View>

            {groupState?.group?.id ? (
              <>
                {notGroup && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalInviteStudentJionGtoup(true);
                    }}>
                    <IconView
                      name="ios-ellipsis-vertical"
                      color={Colors.grayLight}
                      size={24}
                    />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      </>
    );
  }, [studentInfo]);

  return (
    <>
      {topContent}

      <Portal>
        <Dialog visible={modalInviteStudentJionGtoup}>
          <Dialog.Title>Gửi lời mời Sinh viên tham gia nhóm</Dialog.Title>

          <Dialog.Content>
            <TextInput
              placeholder={'Nội dung'}
              onChangeText={text => onChangeText(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalInviteStudentJionGtoup(false)}>
              Hủy
            </Button>
            <ButtonHandle
              onPress={() => sendInviteToStudent()}
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
export default StudentOfList;

const styles = StyleSheet.create({
  contentTitle: {
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0.5,
    shadowOpacity: 3,
    borderRadius: 10,
    backgroundColor: '#caf0f8',
    borderColor: '#caf0f8',
    marginTop: responsiveHeight(10),
    shadowOffset: {width: 2, height: 3},
  },
  viewIcon: {
    width: '10%',
    backgroundColor: '#e8e8e4',
    borderRadius: 10,
    marginRight: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
  },
  joinStyle: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
    backgroundColor: '#38b000',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  nemberMember: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
  },

  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    marginRight: responsiveWidth(5),
    shadowOffset: {width: 2, height: 3},
  },
  content: {
    flexDirection: 'column',
  },
});
