import {
  Button,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import React, {useEffect, useRef, useState} from 'react';
import {Formik, FormikErrors, FormikProps, withFormik} from 'formik';
import ButtonView from '../../common/ButtonView';
import GlobalStyles from '../../common/styles/GlobalStyles';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import authAPI from '../../redux/apis/auth';
import NotifyModel from '../../common/NotifyModel';
import {isIOS, responsiveHeight} from '../../utilities/sizeScreen';

const Login: React.FC<{}> = () => {
  const userState = useAppSelector(state => state.user);

  const [userNameData, setUserName] = useState('');
  const [passwordData, setPassWord] = useState('');
  const userNameRef = useRef();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Shape of form values
  interface FormValues {
    username: string;
    password: string;
  }

  interface OtherProps {}

  interface MyFormProps {
    initialUserName?: string;
    initialPassword?: string;
    login?: any;
  }

  const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
      touched,
      errors,
      values,
      handleChange,
      setFieldTouched,
      isValid,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = props;
    return (
      <Formik
        initialValues={{username: ''}}
        onSubmit={values => console.log(values)}>
        {() => (
          <>
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              placeholder={'Tên đăng nhập'}
              value={values.username}
              style={styles.input}
              ref={userNameRef.current}
            />
            {touched.username && errors.username && (
              <Text style={GlobalStyles.textError}>{errors.username}</Text>
            )}

            <TextInput
              onChangeText={handleChange('password')}
              placeholder={'Mật khẩu'}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              style={styles.input}
            />
            {touched.password && errors.password && (
              <Text style={GlobalStyles.textError}>{errors.password}</Text>
            )}

            <View style={[GlobalStyles.flexEnd]}>
              <TouchableOpacity style={[styles.btnPass]}>
                <Text style={GlobalStyles.rememberText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            <ButtonView
              onPress={handleSubmit}
              title="Đăng nhập"
              disabled={false}
              textStyle={Colors.rosyBrown}
            />
          </>
        )}
      </Formik>
    );
  };

  const handleSubmitForm = async (value: any) => {
    value.username;
    value.password;

    setUserName(value.username);
    setPassWord(value.password);

    console.log('Login', value.username, value.password);
    dispatch(authAPI.login()({username: userNameData, password: passwordData}));

    if (userState.is_login) {
      console.log('userState.user', userState.user);

      navigation.navigate('TabNavigation');
    } else {
      if (userState.error) {
        console.log('userState.error', userState.error);
      }
    }
  };

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
      return {
        username: props.initialUserName || '',
        password: '',
      };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.username) {
        errors.username = 'Vui lòng nhập tên đăng nhập!';
      }
      if (!values.password) {
        errors.password = 'Vui lòng nhập mật khẩu!';
      }
      return errors;
    },

    handleSubmit: values => {
      handleSubmitForm(values);
    },
  })(InnerForm);

  return (
    <View style={GlobalStyles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.primaryButton}
      />
      <Header title="Đăng nhập"></Header>
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          keyboardVerticalOffset={responsiveHeight(150)}
          behavior={'position'}>
          <View style={styles.formView}>
            <MyForm />
          </View>

          {/* <View style={GlobalStyles.centerView}>
            <TouchableOpacity
              style={[styles.buttonRegister]}
              onPress={() => navigation.navigate('TabNavigation')}>
              <Text style={GlobalStyles.textPrimary}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  formView: {
    paddingTop: 150,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 15,
    marginTop: 25,
    fontSize: 16,
  },

  buttonRegister: {
    marginTop: 5,
  },
  btnPass: {
    marginTop: 5,
  },
});
