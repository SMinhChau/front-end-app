import {
  Button,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';

import {useNavigation} from '@react-navigation/native';
import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import React, {useEffect, useRef, useState} from 'react';
import {Formik, FormikErrors, FormikProps, withFormik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ButtonView from '../../common/ButtonView';
import GlobalStyles from '../../common/styles/GlobalStyles';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import authAPI from '../../redux/apis/auth';
import NotifyModel from '../../common/NotifyModel';
import {
  isIOS,
  responsiveHeight,
  responsiveWidth,
} from '../../utilities/sizeScreen';

const Login: React.FC<{}> = () => {
  const userState = useAppSelector(state => state.user);

  const userNameRef = useRef();
  const [textPass, setTextPass] = useState(false);
  const [getPassVisible, setPassVisible] = useState(false);

  useEffect(() => {
    console.log('userState', userState);

    if (userState.is_login) {
      navigation.navigate('TabNavigation');
    } else {
      if (userState.error) {
        Alert.alert('Thông báo!', 'Thông tin đăng nhập không đúng');
      }
    }
  }, [userState]);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

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

  const initialValues = {
    email: '',
    password: '',
  };

  const handleChanText = () => {
    setTextPass(!textPass);
  };

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
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {() => (
          <>
            <View style={styles.viewInput}>
              <Ionicons name={'md-person'} color={Colors.iconbr} size={16} />
            </View>

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

            <View style={styles.viewInput}>
              <Ionicons name={'key'} color={Colors.iconbr} size={16} />
            </View>

            <TextInput
              onChangeText={handleChange('password')}
              placeholder={'Mật khẩu'}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              style={styles.input}
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
            />

            {touched.password && errors.password && (
              <Text style={GlobalStyles.textError}>{errors.password}</Text>
            )}

            <View style={[GlobalStyles.flexEnd]}>
              <TouchableOpacity style={[styles.btnPass]}>
                <Text style={GlobalStyles.rememberText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* 
            {isLoading && (
              <View style={{flex: 1}}>
                <ActivityIndicator
                  size={'large'}
                  color={Colors.primaryButton}
                />
              </View>
            )} */}
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

  const handleSubmitForm = (value: any) => {
    // console.log('Login', value.username, value.password);

    dispatch(
      authAPI.login()({
        username: value.username,
        password: value.password,
      }),
    );

    // try {
    //   const result = await dispatch(
    //     authAPI.login()({username: value.username, password: value.password}),
    //   ).unwrap();

    //   if (userState.user) {
    //     navigation.navigate('TabNavigation');
    //   } else {
    //     if (userState.error) {
    //       console.log('userState.error', userState.error);
    //     }
    //   }
    // } catch (error) {
    //   console.log('error', error);
    // }
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
      } else if (values.password.length < 6) {
        errors.password = 'Mật khẩu phải lớn hơn 5 ký tự!';
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
    backgroundColor: Colors.bg,
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: responsiveWidth(30),
    marginTop: 25,
    fontSize: 16,
    backgroundColor: Colors.white,
  },

  buttonRegister: {
    marginTop: 5,
  },
  btnPass: {
    marginTop: 5,
  },
  viewInput: {
    width: responsiveWidth(13),
    position: 'relative',
    top: responsiveHeight(60),
    left: 9,
    zIndex: 99999,
    backgroundColor: Colors.white,
  },
});
