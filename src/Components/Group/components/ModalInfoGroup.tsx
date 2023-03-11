import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
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

interface Props {
  title: string;
  onPressClose: () => void;
  children: any;
  infoGroup: Group;
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
  children,
  infoGroup,
}) => {
  console.log('infoGroup.members?', infoGroup.members);
  const [listMember, setListMember] = useState<[Member]>();

  useEffect(() => {
    setListMember(infoGroup?.members);
  }, [listMember]);

  const renderListMember = (item: any) => {
    console.log('renderListMember item username', item?.username);
    return (
      <View>
        <Text>{item?.student?.username}</Text>
      </View>
    );
  };

  const renderViewInfo = useMemo(() => {
    return (
      <View style={styles.contentTitle}>
        <View style={styles.nameGroup}>
          {/* <IconView name="ios-caret-forward" color={Colors.iconbr} size={26} /> */}
          <Text numberOfLines={1} style={styles.titleGroup}>
            {infoGroup?.name}
          </Text>
        </View>

        <View style={[styles.flatList]}>
          <ScrollView>
            <FlatList
              data={listMember}
              renderItem={(item: any) => renderListMember(item?.item)}
            />
          </ScrollView>
        </View>
      </View>
    );
  }, []);
  return (
    <Modal visible transparent animationType={'slide'}>
      <View style={{backgroundColor: Colors.white}}>
        <Text style={styles.title}>{title}</Text>
        <CloseButton style={styles.logo} onPress={onPressClose} />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={[styles.content, {flex: 1}]}
          keyboardVerticalOffset={responsiveHeight(200)}
          behavior={'padding'}>
          {renderViewInfo}
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
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
    height: '100%',
    backgroundColor: Colors.white,
    zIndex: 99999,
    // paddingHorizontal: responsiveWidth(16),
  },
  contentTitle: {
    width: '100%',
    height: '100%',
    borderColor: '#caf0f8',
    borderWidth: 1,
    shadowOpacity: 3,
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
    paddingHorizontal: responsiveWidth(10),
    backgroundColor: '#6a994e',
  },
  viewIcon: {
    backgroundColor: '#dda15e',
    borderRadius: 10,
    borderColor: '#ff9f1c',
    borderWidth: 1,
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
    flex: 1,
  },
});
