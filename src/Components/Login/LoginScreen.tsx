import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';

import ButtonView from '../../common/ButtonView';
import GlobalStyles from '../../common/styles/GlobalStyles';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import authAPI from '../../redux/apis/auth';

import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';

import LoadingScreen from '../../common/LoadingScreen';
import RouteNames from '../RouteNames';
import authService from '../../services/auth';
import {Button, Dialog, Portal} from 'react-native-paper';
import ButtonHandle from '../../common/ButtonHandle';
import PopupNotification from '../../common/PopupNotification';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {
  showMessageEror,
  showMessageSuccess,
  showMessageWarning,
} from '../../utilities/utils';

const Login: React.FC<{}> = () => {
  const userState = useAppSelector(state => state.user);

  const userNameRef = useRef();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isPassWord, setPassword] = useState(true);
  const [inputUsername, setUserName] = useState('');
  const [inputPassword, setPass] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [isResetPass, setResetPass] = useState(false);

  const [modalRestPass, setModalRestPass] = useState(false);
  const [inputUserName, setInputUserName] = useState('');

  const hideDialog = () => setModalRestPass(false);
  const onChangeText = (text: string) => {
    setInputUserName(text);
  };

  useFocusEffect(
    useCallback(() => {
      setUserName('');
      setPass('');
    }, []),
  );

  useEffect(() => {
    if (userState.is_login) {
      setLoading(false);
      navigation.navigate(RouteNames.TabNavigation);
    }
    if (userState.error) {
      setLoading(false);
      showMessageEror('Thông tin đăng nhập không đúng'!);
    }
  }, [userState]);

  const handleCheck = () => {
    setPassword(!isPassWord);
  };

  const handleSubmit = async () => {
    if (inputUsername !== '') {
      if (inputPassword.length < 6) {
        showMessageWarning('Mật khẩu phải lớn hơn 5 ký tự!');
      } else {
        setErrorPass('');
        setLoading(true);
        await dispatch(
          authAPI.login()({
            username: inputUsername,
            password: inputPassword,
          }),
        );
      }
    } else {
      showMessageWarning('Vui lòng nhập tên!');
    }
  };

  const handleResetPassword = async () => {
    if (inputUserName !== '') {
      setResetPass(true);
      await authService
        .resetPassword({username: inputUserName})
        .then(result => {
          setModalRestPass(false);
          setResetPass(false);
          setInputUserName('');
          showMessageSuccess(
            `Đã gửi yêu cầu khôi phục mật khẩu đến email: ${result.data.email}`,
          );
        })
        .catch(er => {
          setModalRestPass(false);
          setResetPass(false);
          setInputUserName('');
          showMessageEror('Tên đăng nhập không tồn tại!');
        });
    } else {
      showMessageWarning('Vui lòng nhập tên!');
    }
  };

  const formLogin = useMemo(() => {
    return (
      <>
        <View style={styles.contentForm}>
          <View style={[styles.contentInputTop]}>
            <View style={styles.viewInputTop}>
              <Ionicons name={'md-person'} color={Colors.iconbr} size={16} />
            </View>
            <TextInput
              placeholder={'Tên đăng nhập'}
              value={inputUsername}
              onChangeText={text => setUserName(text)}
              style={styles.input}
              ref={userNameRef.current}
            />
          </View>

          <View style={[styles.contentInput, GlobalStyles.centerView]}>
            <View style={styles.viewInput}>
              <Ionicons name={'key'} color={Colors.iconbr} size={16} />
            </View>
            <TextInput
              placeholder={'Mật khẩu'}
              value={inputPassword}
              onChangeText={text => setPass(text)}
              secureTextEntry={isPassWord}
              style={styles.input}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
            />

            <TouchableOpacity style={styles.iconRight} onPress={handleCheck}>
              {isPassWord === true ? (
                <Ionicons
                  name={'ios-eye-off-outline'}
                  color={Colors.iconbr}
                  size={16}
                />
              ) : (
                <Ionicons
                  name={'ios-eye-outline'}
                  color={Colors.iconbr}
                  size={16}
                />
              )}
            </TouchableOpacity>
          </View>
          {errorPass && <Text style={GlobalStyles.textError}>{errorPass}</Text>}
          <View style={[GlobalStyles.flexEnd]}>
            <TouchableOpacity
              style={[styles.btnPass]}
              onPress={() => {
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: 'Success',
                  textBody: 'Congrats! this is toast notification success',
                });
                // setModalRestPass(true);
              }}>
              <Text style={GlobalStyles.rememberText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          <ButtonView
            onPress={handleSubmit}
            title="Đăng nhập"
            disabled={false}
            style={styles.btn}
            textStyle={Colors.rosyBrown}
          />
        </View>
      </>
    );
  }, [
    errorPass,
    inputPassword,
    inputUsername,
    handleCheck,
    handleSubmit,
    userNameRef,
    userState,
  ]);

  return (
    <View style={[GlobalStyles.container, {backgroundColor: Colors.white}]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.primaryButton}
      />
      <AlertNotificationRoot>
        <Header title="Đăng nhập"></Header>

        <ScrollView>
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={responsiveHeight(110)}
            behavior={'position'}>
            <View style={styles.formView}>
              <View style={GlobalStyles.centerView}>
                <Lottie
                  source={require('../../assets/jsonAmination/login.json')}
                  autoPlay
                  loop
                  style={styles.logo}
                />
              </View>

              {formLogin}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </AlertNotificationRoot>
      {isLoading === true && <LoadingScreen />}
      {isResetPass === true && <LoadingScreen />}

      <Portal>
        <Dialog
          visible={modalRestPass}
          onDismiss={hideDialog}
          style={{backgroundColor: Colors.white}}>
          <Dialog.Title style={styles.titleModal}>
            Lấy lại mật khẩu
          </Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.inputModal}
              placeholder={'Tên đăng nhập'}
              onChangeText={text => onChangeText(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalRestPass(false)}>Hủy</Button>
            <ButtonHandle
              onPress={() => handleResetPassword()}
              icon
              iconName="paper-plane-outline"
              title="Gửi"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  formView: {
    marginTop: responsiveHeight(50),
    marginHorizontal: responsiveWidth(5),
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fae1dd',
    paddingHorizontal: responsiveWidth(30),
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  inputModal: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#73c3ed',
    paddingHorizontal: responsiveWidth(10),
    fontSize: 16,
    backgroundColor: Colors.white,
  },

  buttonRegister: {
    marginTop: 5,
  },
  btnPass: {
    marginTop: 5,
  },
  viewInputTop: {
    width: responsiveWidth(13),
    position: 'relative',
    left: 10,
    top: 35,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
  viewInput: {
    width: responsiveWidth(13),
    position: 'relative',
    left: 22,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
  seconIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentForm: {
    flexDirection: 'column',
    paddingHorizontal: responsiveHeight(15),
    paddingVertical: responsiveHeight(5),
    // paddingBottom: responsiveHeight(20),
    backgroundColor: Colors.blueBoder,
    borderColor: '#fec89a',
    borderWidth: 1,
    shadowOpacity: 3,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  contentInput: {
    flexDirection: 'row',
    marginTop: responsiveHeight(15),
  },
  contentInputTop: {
    flexDirection: 'column',
    marginTop: responsiveHeight(15),
  },
  logo: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
    marginBottom: responsiveHeight(10),
    alignContent: 'center',
  },
  iconRight: {
    position: 'relative',
    right: 30,
  },
  btn: {
    borderColor: Colors.blueBoder,
  },
  titleModal: {
    fontSize: responsiveFont(15),
    color: '#003049',
  },
});
