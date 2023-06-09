import {useMemo, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Header from '../../common/Header';
import GlobalStyles from '../../common/styles/GlobalStyles';
import {Images} from '../../assets/images/Images';
import Line from '../../common/Line';
import TextItemAccount from './component/TextItemAccount';
import languages from '../../languages';
import Colors from '../../Themes/Colors';
import IconView from '../../common/IconView';
import tokenService from '../../services/token';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux/hooks';
import RouteNames from '../RouteNames';
import ModalAccount from './component/ModalAccount';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';

import {checkGenger, checkTypeTraining} from '../../utilities/contants';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {DataTable} from 'react-native-paper';
import {isEmpty, showMessageWarning} from '../../utilities/utils';

const Account: React.FC<{}> = ({}) => {
  const navigation = useNavigation();

  const majorState = useAppSelector(state => state.major.major);
  const userState = useAppSelector(state => state.user.user);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    tokenService
      .reset()
      .then(() => navigation.navigate(RouteNames.loginNavigation));
  };

  const handleChangePass = () => {
    if (isEmpty(userState.email)) {
      showMessageWarning('Vui lòng cập nhật email');
    } else {
      navigation.navigate(RouteNames.ForgotPassword);
    }
  };

  const renderTop = () => {
    return (
      <>
        <Image
          source={userState?.avatar ? {uri: userState?.avatar} : Images.avatar}
          style={styles.imgaAvatar}
        />
        <View style={styles.topLeft}>
          <TextItemAccount
            main={true}
            textLeft={languages['vi'].code}
            textRight={userState?.username}></TextItemAccount>
          <TextItemAccount
            main={true}
            textLeft={languages['vi'].name}
            textRight={userState?.name}></TextItemAccount>
        </View>
      </>
    );
  };

  const renderMain = useMemo(
    () => (
      <View style={styles.main}>
        <TextItemAccount
          textLeft={languages['vi'].gender}
          textRight={checkGenger(userState?.gender)}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].schoolYear}
          textRight={userState?.schoolYear}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].special}
          textRight={majorState?.name}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].typeTraining}
          textRight={checkTypeTraining(userState?.typeTraining)}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].numberPhone}
          textRight={userState?.phoneNumber}
          line={true}></TextItemAccount>

        <TextItemAccount
          textLeft={languages['vi'].email}
          textRight={userState?.email}
          line={true}></TextItemAccount>
      </View>
    ),
    [userState, majorState],
  );

  return (
    <>
      <AlertNotificationRoot>
        <Header title="Thông tin" iconRight={true}></Header>

        <View style={styles.content}>
          <View style={[styles.update]}>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                setShowModal(true);
              }}>
              <Lottie
                source={require('../../../src/assets/jsonAmination/update.json')}
                autoPlay
                loop
                style={styles.logo}
              />

              <Text style={GlobalStyles.textPrimary}>
                {languages['vi'].update}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.topAccount]}>{renderTop()}</View>
          <Line lager={true}></Line>

          {renderMain}
          <DataTable>
            <TouchableOpacity
              style={[GlobalStyles.flexDirectionRow, styles.btnAction]}
              onPress={handleChangePass}>
              <Text style={styles.itemAction}>Đổi mật khẩu</Text>
              <IconView name="key-outline" color={Colors.blueBoder} />
            </TouchableOpacity>
          </DataTable>

          <TouchableOpacity
            style={[
              GlobalStyles.flexDirectionRow,
              styles.btnAction,
              {zIndex: 100000},
            ]}
            onPress={handleLogout}>
            <Text style={styles.logout}>{languages['vi'].logout}</Text>
            <IconView
              name={'ios-log-out-outline'}
              size={24}
              color={Colors.red}
            />
          </TouchableOpacity>
        </View>
      </AlertNotificationRoot>

      <ModalAccount
        visible={showModal}
        title={languages['vi'].updateInfo}
        onPressClose={setShowModal}
      />
    </>
  );
};
export default Account;

const styles = StyleSheet.create({
  content: {
    height: Dimensions.get('window').height,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
  },
  topAccount: {
    flexDirection: 'row',
    width: '100%',
  },
  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    margin: 10,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    shadowOffset: {width: 2, height: 3},
  },
  topLeft: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingBottom: 5,
  },
  main: {
    marginTop: 20,
    marginHorizontal: 20,
    // flexDirection: 'column',
    // backgroundColor: '#ccc',
  },
  logout: {
    color: Colors.red,
    fontSize: responsiveFont(15),
    paddingRight: 20,
    marginLeft: 20,
  },
  itemAction: {
    color: Colors.blueBoder,
    fontSize: responsiveFont(15),
    paddingRight: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  update: {
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 15,
    position: 'relative',
    top: 15,
    zIndex: 99999,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: responsiveWidth(10),
  },
  logo: {
    width: 40,
    height: 40,
  },
  textPrimary: {
    fontSize: responsiveFont(16),
    color: Colors.drakCyonBoder,
  },
  btnAction: {
    // backgroundColor: '#ccf',
    paddingVertical: responsiveHeight(10),
  },
  titleModal: {
    fontSize: responsiveFont(15),
    color: '#003049',
  },
  btn: {
    width: '100%',
  },
  view_Portal: {
    backgroundColor: '#e9d8a6',
  },
});
