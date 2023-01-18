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
import {Formik} from 'formik';
import {inputStyle} from '../../common/styles/GlobalStyles';

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const navigation = useNavigation();
  const initialValues: FormValues = {email: '', password: ''};
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primary} />
      <Header title="Đăng nhập"></Header>
      <Formik
        initialValues={{
          name: '',
          password: '',
        }}
        onSubmit={values => console.log(JSON.stringify(values))}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.name}
              style={inputStyle}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              placeholder="Name"
            />
            {touched.name && errors.name && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.name}
              </Text>
            )}

            <TextInput
              value={values.password}
              style={inputStyle}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.password}
              </Text>
            )}
            <Button
              color="#3740FE"
              title="Submit"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  formContainer: {},
});
