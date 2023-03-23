import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  deviceWidth,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

import {
  HelperText,
  Modal,
  Portal,
  Provider,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import languages from '../../../languages';
import CustomButton from '../../../common/CustomButton';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import TextInputView from '../../../common/TextInputView';
import IconView from '../../../common/IconView';
import {isEmpty, validateEmail} from '../../../utilities/utils';
import GenderButton from '../../../common/GenderButton';

import {Images} from '../../../assets/images/Images';

import authAPI from '../../../redux/apis/auth';
import data from '../../Home/data';

interface Props {
  title: string;
  onPressClose: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}
interface ImagePicker {
  fileName: string;

  uri: string;
  type: string;
}
const ModalAccount: React.FC<Props> = ({title, onPressClose, visible}) => {
  const userState = useAppSelector(state => state.user);
  const [selectedAvatar, setSelectedAvatar] = useState<ImagePicker>();
  const dispatch = useAppDispatch();

  const BASIC_INFO = [
    {
      key: 'username',
      placeholder: userState?.user?.username,
      title: `${languages['vi'].code}`,
    },
    {
      key: 'name',
      placeholder: userState?.user?.name,
      title: `${languages['vi'].name}`,
    },
    {
      key: 'gender',
      placeholder: userState?.user?.gender,
      title: `${languages['vi'].code}`,
    },
    {
      key: 'schoolYear',
      placeholder: userState?.user?.schoolYear,
      title: `${languages['vi'].schoolYear}`,
    },
    {
      key: 'phoneNumber',
      placeholder: userState?.user?.phoneNumber,
      title: `${languages['vi'].numberPhone}`,
    },
    {
      key: 'email',
      placeholder: userState?.user?.email,
      title: `${languages['vi'].email}`,
    },
  ];

  const [basicInfo, setBasicInfo] = useState({
    avatar: userState?.user?.avatar,
    username: userState?.user?.username,
    name: userState?.user?.name,
    gender: userState?.user?.gender || '',
    schoolYear: userState?.user?.schoolYear || '',
    typeTraining: userState?.user?.typeTraining,
    phoneNumber: userState?.user?.phoneNumber,
    email: userState?.user?.email,
  });

  const handleSubmitForm = async () => {
    console.log('handleSubmitForm >>>>>>selectedAvatar', selectedAvatar);
    setBasicInfo({
      ...basicInfo,
    });

    const formData = new FormData();
    formData.append('username', basicInfo.username);
    formData.append('name', basicInfo.name);
    formData.append('gemder', basicInfo.gender);
    formData.append('schoolYear', basicInfo.schoolYear);
    formData.append('typeTraining', basicInfo.typeTraining);
    formData.append('phoneNumber', basicInfo.phoneNumber);
    formData.append('email', basicInfo.email);
    if (selectedAvatar?.uri) {
      formData.append('avatar', {
        uri: selectedAvatar?.uri,
        type: selectedAvatar?.type,
        fileName: selectedAvatar?.fileName,
      });
    } else {
      formData.append('avatar', basicInfo?.avatar);
    }

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>formData', formData);
    dispatch(authAPI.updateUserInfo()(formData));
    if (userState?.updated) {
      onPressClose(false);
      Alert.alert('Thông báo!', 'Cập nhật thành công!');
    }
    if (userState?.updateError) {
      onPressClose(false);
      Alert.alert('Thông báo!', 'Cập nhật không thành công!');
    }
  };

  const isError = basicInfo.email ? !validateEmail(basicInfo.email) : false;

  const genderBlock = (index: any) => {
    return (
      <>
        <View key={index} style={styles.contentRadio}>
          <Text style={styles.lable}>{languages['vi'].gender}</Text>
          <Text style={{color: Colors.red}}> *</Text>
          <View style={styles.leftRadio}>
            <View style={styles.rowRadio}>
              <GenderButton
                text="Nam"
                male={true}
                style={
                  basicInfo.gender === 'Male'
                    ? Colors.rosyBrown
                    : Colors.primaryButton
                }
                selected={basicInfo.gender === 'Male'}
                onPress={() => setBasicInfo({...basicInfo, gender: 'Male'})}
              />
            </View>

            <View style={styles.rowRadio}>
              <GenderButton
                text="Nữ"
                style={
                  basicInfo.gender === 'Female'
                    ? Colors.rosyBrown
                    : Colors.primaryButton
                }
                selected={basicInfo.gender === 'Female'}
                onPress={() => setBasicInfo({...basicInfo, gender: 'Female'})}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  const handleGetAvatar = () => {
    console.log('selectedAvatar', selectedAvatar);

    if (selectedAvatar?.uri) {
      return {uri: selectedAvatar?.uri};
    }

    return basicInfo.avatar ? {uri: basicInfo.avatar} : Images.avatar;
  };

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
      });
      console.log('response', response[0]);
      setSelectedAvatar({
        uri: `file://${response[0].realPath}`,
        type: response[0].mime,
        fileName: response[0].fileName,
      });
    } catch (e: any) {
      console.log(e.code, e.message);
    }
  };

  const renderImage = useMemo(() => {
    return (
      <>
        <View style={[styles.contentImage, GlobalStyles.flexDirectionRow]}>
          <Image source={handleGetAvatar()} style={styles.imgaAvatar} />
          <TouchableOpacity style={styles.contentIcon} onPress={openPicker}>
            <IconView name={'camera'} size={24} color={'#2c312c'} />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [selectedAvatar]);

  return (
    <Portal>
      <Modal visible={visible} style={{marginHorizontal: responsiveWidth(10)}}>
        <View style={{backgroundColor: Colors.white}}>
          <Text style={styles.title}>{title}</Text>
          <CloseButton
            style={styles.logo}
            onPress={() => onPressClose(false)}
          />
        </View>
        <ScrollView>
          <View style={styles.contentForm}>
            {renderImage}
            <View style={styles.content}>
              {BASIC_INFO.map((item, index) => {
                if (item?.key === 'gender') {
                  return genderBlock(index);
                }

                const isUserName = () => item?.key === 'username';
                return (
                  <TextInputView
                    inputStyle={{
                      borderColor: Colors.blueBoder,
                      borderRadius: 6,
                    }}
                    isRequire={!isUserName()}
                    editable={!isUserName()}
                    title={item.title}
                    titleStyle={[styles.lable]}
                    textInputStyle={{
                      fontSize: responsiveFont(14),
                      color: Colors.black,
                    }}
                    key={index.toString()}
                    placeholder={item.placeholder}
                    onChangeText={text =>
                      setBasicInfo({...basicInfo, [item.key]: text})
                    }
                    style={{marginBottom: responsiveHeight(20)}}
                    messageError={item.key === 'email' && isError}
                  />
                );
              })}
            </View>
            <View style={styles.viewBtn}>
              <CustomButton
                onPress={() => handleSubmitForm()}
                style={styles.btn}
                icon
                title={languages['vi'].update}></CustomButton>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};
export default ModalAccount;

const styles = StyleSheet.create({
  logo: {
    top: responsiveWidth(17),
  },
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(16),
  },
  top: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(10),
  },
  topLeft: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(15),
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    backgroundColor: Colors.white,
    margin: responsiveHeight(20),
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: responsiveWidth(15),
    marginTop: 25,
    fontSize: 16,
  },

  inputDefault: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(15),
    marginHorizontal: responsiveWidth(15),
    fontSize: 16,
  },
  inputDisable: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: '#edf6f9',
    fontSize: 16,
    marginLeft: responsiveWidth(20),
  },
  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  viewBtn: {
    alignItems: 'flex-end',
  },
  btn: {
    margin: responsiveHeight(16),
  },
  contentForm: {
    backgroundColor: Colors.white,
  },
  contentRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(16),
  },
  viewRadio: {
    paddingHorizontal: responsiveWidth(10),
    flexDirection: 'row',
  },

  leftRadio: {
    flexDirection: 'row',
    width: '30%',
    marginLeft: responsiveWidth(30),
    justifyContent: 'space-between',
  },
  lable: {
    color: Colors.textPrimary,
    fontSize: responsiveFont(14),
    fontWeight: '400',
  },
  rowRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentImage: {
    paddingLeft: responsiveWidth(20),
    flexDirection: 'row',
    marginVertical: responsiveHeight(10),
  },
  contentIcon: {
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    position: 'relative',
    left: responsiveWidth(-30),
    top: responsiveHeight(30),
  },
});
