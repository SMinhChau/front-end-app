import {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import CloseButton from '../../../common/CloseButton';
import IconView from '../../../common/IconView';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import {useAppSelector} from '../../../redux/hooks';
import groupService from '../../../services/group';
import topicService from '../../../services/topic';
import Colors from '../../../Themes/Colors';
import Group from '../../../utilities/Contant/Group';
import Topic from '../../../utilities/Contant/Topic';
import User from '../../../utilities/contants';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import ModalInfoGroup from './ModalInfoGroup';

interface Props {
  title: string;
  icon?: boolean;
  onPress: () => void;
  handleJoin: () => void;
  join: boolean;
  groupInfo: Group;
  menberInfo?: string;
}
const GroupItem: React.FC<Props> = ({
  title,
  icon,
  onPress,
  join,
  handleJoin,
  groupInfo,
  menberInfo,
}) => {
  const [itemGroup, setItemGroup] = useState<Group>();
  const [infoGroupItem, setInfoGroupItem] = useState<Group>();
  const [member, setMember] = useState('');
  const [topic, setTopic] = useState<Topic>();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setItemGroup(groupInfo);
  }, [itemGroup, topic]);

  useEffect(() => {
    handleGetInforGroup();
    getTopicForGroup();
  }, []);

  const handleGetInforGroup = () => {
    console.log('handleGetInforGroup itemGroup', itemGroup);
    groupService.getGroupById(itemGroup?.id as number).then(result => {
      setInfoGroupItem(result.data);
      console.log('handleGetInforGroup result?.data', result?.data);
      setMember(result?.data?.members);
    });
  };

  const getTopicForGroup = () => {
    topicService
      .getMajorById(itemGroup?.topic?.id as number)
      .then(result => {
        setTopic(result?.data);
      })
      .catch(error => console.log('getTopic error', error));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={[GlobalStyles.margin20, styles.contentTitle]}>
        <View style={styles.viewIcon}>
          <IconView
            name="ios-people-circle-sharp"
            color={Colors.iconbr}
            size={26}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '90%',
          }}>
          <Text numberOfLines={1} style={styles.titleGroup}>
            {itemGroup?.name}
          </Text>

          <Text style={styles.nemberMember}>Số lượng: {member?.length} </Text>

          {/* {isJoinGroup && (
            <TouchableOpacity onPress={handleJoin}>
              <Text style={styles.joinStyle}>Tham gia </Text>
            </TouchableOpacity>
          )} */}
        </View>

        <Portal>
          <ModalInfoGroup
            visible={visible}
            infoGroup={itemGroup as Group}
            title={'Thông tin nhóm'}
            topicInfo={topic as Topic}
            modalClose={setVisible}></ModalInfoGroup>
        </Portal>
      </TouchableOpacity>
    </>
  );
};
export default GroupItem;

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
  logo: {
    top: responsiveWidth(17),
  },
});
