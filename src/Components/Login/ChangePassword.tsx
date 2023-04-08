import {
  Button,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import React, {useState} from 'react';

import GlobalStyles from '../../common/styles/GlobalStyles';
import {responsiveHeight, responsiveWidth} from '../../utilities/sizeScreen';

import ButtonView from '../../common/ButtonView';
import Lottie from 'lottie-react-native';
const ChangePassword: React.FC<{}> = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [errorPassConfirm, setErrorPassConfirm] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorPasswordOld, setErrorPasswordOld] = useState('');
  const [isPassWord, setPassword] = useState(true);

  const [inputPasswordOld, setInputPasswordOld] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState('');

  const handleCheck = () => {
    setPassword(!isPassWord);
  };

  const formChangePassword = () => {
    return (
      <>
        <View style={[styles.contentInput, GlobalStyles.centerView]}>
          <View style={styles.viewInput}>
            <Ionicons name={'key'} color={Colors.iconbr} size={16} />
          </View>
          <TextInput
            placeholder={'Mật khẩu cũ'}
            value={inputPasswordOld}
            onChangeText={text => setInputPasswordOld(text)}
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
        {/* {errorPass && <Text style={GlobalStyles.textError}>{errorPass}</Text>} */}

        <View style={[styles.contentInput, GlobalStyles.centerView]}>
          <View style={styles.viewInput}>
            <Ionicons name={'key'} color={Colors.iconbr} size={16} />
          </View>
          <TextInput
            placeholder={'Mật khẩu mới'}
            value={inputPassword}
            onChangeText={text => setInputPassword(text)}
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
        {/* {errorPass && <Text style={GlobalStyles.textError}>{errorPass}</Text>} */}
        <View style={[styles.contentInput, GlobalStyles.centerView]}>
          <View style={styles.viewInput}>
            <Ionicons name={'key'} color={Colors.iconbr} size={16} />
          </View>
          <TextInput
            placeholder={'Xác nhận mật khẩu'}
            value={inputPasswordConfirm}
            onChangeText={text => setInputPasswordConfirm(text)}
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
        {/* {errorPass && <Text style={GlobalStyles.textError}>{errorPass}</Text>} */}
        <ButtonView
          title="Cập nhật"
          disabled={false}
          style={styles.btn}
          textStyle={Colors.rosyBrown}
        />
      </>
    );
  };
  return (
    <View style={GlobalStyles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.primaryButton}
      />
      <Header iconLeft back={true} title="Quên mật khẩu"></Header>

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

            {formChangePassword()}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default ChangePassword;

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: responsiveWidth(10),

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveHeight(15),
    paddingVertical: responsiveHeight(5),
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
