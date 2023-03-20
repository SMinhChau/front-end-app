import {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
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
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import RouteNames from '../RouteNames';
import majorService from '../../services/major';
import data from '../Home/data';
import {dispatch} from '@backpackapp-io/react-native-toast/lib/typescript/core/store';
import majorAPI from '../../redux/apis/major';
import Major from '../../utilities/contants';
import ModalAccount from './component/ModalAccount';
import {responsiveFont, responsiveWidth} from '../../utilities/sizeScreen';

// interface Major {
//   id: string;
//   name: string;
//   headLecturer: {
//     id: number;
//     majors: Object;
//     degree: string;
//     isAdmin: string;
//     createdAt: Date;
//     updatedAt: string;
//   };
// }

const Account: React.FC<{}> = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const majorState = useAppSelector(state => state.major.major);
  const userState = useAppSelector(state => state.user.user);

  // useEffect(() => {
  //   dispatch(majorAPI.getMajorById()(userState?.majors?.id));
  //   setMajorById(majorState?.name);
  // }, []);

  // const getMajor = async () => {
  //   dispatch(await majorAPI.getMajorById()(userState?.majors?.id));
  //   console.log('majorState', majorState);
  // };

  const [showModal, setShowModal] = useState(false);

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

  const renderMain = () => {
    return useMemo(
      () => (
        <View style={styles.main}>
          <TextItemAccount
            textLeft={languages['vi'].gender}
            textRight={userState?.gender === 'male' ? 'Nam' : 'Nữ'}
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
            textRight={userState?.typeTraining}
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
  };

  return (
    <>
      <Header title="Thông tin" iconRight={true}></Header>

      <View style={[GlobalStyles.container, styles.content]}>
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

        {renderMain()}
        <TouchableOpacity
          style={[GlobalStyles.flexDirectionRow]}
          onPress={async () => {
            await tokenService.reset();
            console.log('Token - reset', tokenService.getAccessToken);
            navigation.navigate(RouteNames.loginNavigation);
          }}>
          <Text style={styles.logout}>{languages['vi'].logout}</Text>
          <IconView name={'ios-log-out-outline'} size={24} color={Colors.red} />
        </TouchableOpacity>
      </View>

      <ModalAccount
        visible={showModal}
        title={languages['vi'].updateInfo}
        onPressClose={() => {
          setShowModal(false);
        }}></ModalAccount>
    </>
  );
};
export default Account;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    flexDirection: 'column',
  },
  logout: {
    color: Colors.red,
    fontSize: 15,
    paddingRight: 20,
    marginLeft: 20,
  },
  update: {
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingRight: 15,
    position: 'relative',
    top: 20,
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
});
