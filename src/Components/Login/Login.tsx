import {
  Button,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Colors from '../../Themes/Colors';
import Header from '../../common/Header';
import React from 'react';
import {Formik, FormikErrors, FormikProps, withFormik} from 'formik';

import {responsiveHeight, responsiveWidth} from '../../utilities/sizeScreen';
import ButtonView from '../../common/ButtonView';
import GlobalStyles from '../../common/styles/GlobalStyles';
import InputView from '../../common/InputView';

const Login: React.FC<{}> = () => {
  const navigation = useNavigation();
  // Shape of form values
  interface FormValues {
    name: string;
    password: string;
  }

  interface OtherProps {}

  interface MyFormProps {
    initialName?: string;
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
        initialValues={{email: ''}}
        onSubmit={values => console.log(values)}>
        {() => (
          <>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder={'Tên đăng nhập'}
              value={values.name}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={GlobalStyles.textError}>{errors.name}</Text>
            )}

            <TextInput
              onChangeText={handleChange('password')}
              placeholder={'Mật khẩu'}
              onBlur={handleBlur('password')}
              value={values.password}
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

  const handleSubmitForm = (value: any) => {
    console.log('>>>Login value', value);
    navigation.navigate('Home');
  };

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
      return {
        name: props.initialName || '',
        password: '',
      };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.name) {
        errors.name = 'Vui lòng nhập tên đăng nhập!';
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
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />
      <Header title="Đăng nhập"></Header>

      <View style={styles.formView}>
        <MyForm />
      </View>

      <View style={GlobalStyles.centerView}>
        <TouchableOpacity
          style={[styles.buttonRegister]}
          onPress={() => navigation.navigate('Register')}>
          <Text style={GlobalStyles.textPrimary}>Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  formView: {
    paddingTop: responsiveHeight(150),
    paddingHorizontal: responsiveWidth(20),
    backgroundColor: Colors.white,
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: responsiveWidth(15),
    marginTop: responsiveHeight(25),
    fontSize: 16,
  },

  buttonRegister: {
    marginTop: responsiveWidth(5),
  },
  btnPass: {
    marginTop: 5,
  },
});
