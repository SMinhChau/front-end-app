import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {Modal} from 'react-native-paper';
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
  const [listMember, setListMember] = useState<[Member]>();
  const [isMore, setShowMore] = useState(false);

  useEffect(() => {
    setListMember(infoGroup?.members);
  }, [listMember]);

  const renderListMember = useMemo(
    () => (item: any) => {
      return (
        <View style={styles.contenMember}>
          <View style={styles.leftContent}>
            <Lottie
              source={require('../../../assets/jsonAmination/88012-student-animated-icon.json')}
              autoPlay
              loop
              style={styles.amination}
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
              textRight={item?.student?.gender}></TextItemAccount>
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
      <View style={styles.contenMember}>
        <Text>Thoong tin de tai</Text>
      </View>
    );
  }, []);

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

        <View style={[styles.flatList]}>
          <FlatList
            horizontal={true}
            data={listMember}
            contentContainerStyle={{
              width: '100%',
            }}
            renderItem={(item: any) => renderListMember(item?.item)}
          />
        </View>

        <Text style={[styles.titleGroup, {marginTop: 5}]}>
          Thông tin đề Tài
        </Text>

        {renderInfoTopic}
      </View>
    );
  }, [listMember]);

  return (
    <Modal visible>
      <View style={{backgroundColor: Colors.white}}>
        <Text style={styles.title}>{title}</Text>
        <CloseButton style={styles.logo} onPress={onPressClose} />
      </View>
      <ScrollView>{renderViewInfo}</ScrollView>
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
    height: '80%',
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
  leftContent: {
    width: '25%',
  },
  rightContent: {
    width: '75%',
    paddingVertical: responsiveHeight(10),
  },
  amination: {},
});
