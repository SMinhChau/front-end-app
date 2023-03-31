import {useCallback, useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import ButtonHandle from '../../../../common/ButtonHandle';
import CloseButton from '../../../../common/CloseButton';
import IconView from '../../../../common/IconView';
import GlobalStyles from '../../../../common/styles/GlobalStyles';
import {useAppSelector} from '../../../../redux/hooks';
import groupService from '../../../../services/group';
import topicService from '../../../../services/topic';
import Colors from '../../../../Themes/Colors';
import Group from '../../../../utilities/Contant/Group';
import Term from '../../../../utilities/Contant/Term';
import Topic from '../../../../utilities/Contant/Topic';
import User from '../../../../utilities/contants';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../../utilities/sizeScreen';
import {isEmpty} from '../../../../utilities/utils';
import ModalInfoGroup from './../ModalInfoGroup';

interface Props {
  studentName?: string;
  message?: string;
  icon?: boolean;
  onPress?: () => void;
  handleJoin?: () => void;
}
const ContentItemInvite: React.FC<Props> = ({
  studentName,
  icon,
  onPress,
  handleJoin,
  message,
}) => {
  const [infoGroupItem, setInfoGroupItem] = useState<Group>();
  const [member, setMember] = useState('');
  const [topic, setTopic] = useState<Topic>();

  const [visible, setVisible] = useState(false);

  const topContent = useMemo(() => {
    return (
      <>
        <View style={[GlobalStyles.margin20, styles.contentTitle]}>
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
            <View style={styles.contentText}>
              <Text numberOfLines={1} style={styles.titleGroup}>
                {studentName}
              </Text>
              <Text numberOfLines={1} style={styles.titleMessage}>
                Nội dung {message ? message : 'Không có lời nhắn'}
              </Text>
            </View>
          </View>
          <ButtonHandle icon iconName="paper-plane-outline" title="Hủy" />
        </View>
      </>
    );
  }, [infoGroupItem, member]);

  return <>{topContent}</>;
};
export default ContentItemInvite;

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

    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
  },
  titleMessage: {
    fontSize: responsiveFont(15),
    color: Colors.grayLight,
    fontWeight: '400',

    paddingHorizontal: responsiveWidth(10),
  },
  contentText: {
    flexDirection: 'column',
  },
});
