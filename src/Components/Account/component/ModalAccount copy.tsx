import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from 'react-native';

import {Formik, FormikErrors, FormikProps, withFormik} from 'formik';
import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  deviceWidth,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
import DropDownPicker from 'react-native-dropdown-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import languages from '../../../languages';
import CustomButton from '../../../common/CustomButton';
import GlobalStyles from '../../../common/styles/GlobalStyles';
import {useAppSelector} from '../../../redux/hooks';
import {Images} from '../../../assets/images/Images';
import TextItemAccount from './TextItemAccount';
import {Modal} from 'react-native-paper';

interface Props {
  title: string;
  onPressClose(): any;
}
interface FormValues {
  username: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  name: string;
  gender: string;
  typeTraining: string;
  schoolYear: string;
}

interface MyFormProps {
  initialUserName?: string;
}

const ModalAccount: React.FC<Props> = ({title, onPressClose}) => {
  const userState = useAppSelector(state => state.user.user);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const initialValues = {
    username: '',
    avatar: '',
    phoneNumber: '',
    email: '',
    name: '',
    gender: '',
    typeTraining: '',
    schoolYear: '',
  };

  const InnerForm = (props: FormikProps<FormValues>) => {
    const {
      touched,
      errors,
      values,
      handleChange,
      setFieldTouched,

      handleBlur,
      handleSubmit,
    } = props;
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {() => (
          <>
            <View style={styles.top}>
              <Image
                source={
                  userState?.avatar ? {uri: userState?.avatar} : Images.avatar
                }
                style={styles.imgaAvatar}
              />

              <View style={styles.topLeft}>
                <Text style={styles.inputDisable}>{languages['vi'].code}:</Text>
                <TextInput
                  editable={false}
                  selectTextOnFocus={false}
                  placeholder={userState.username}
                  value={userState.username}
                  style={styles.inputDisable}
                />
              </View>
            </View>

            <TextItemAccount textLeft={languages['vi'].name}>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder={userState.name}
                value={values.name}
                style={styles.inputDDefault}
              />
              {touched.name && errors.name && (
                <Text style={GlobalStyles.textError}>{errors.name}</Text>
              )}
            </TextItemAccount>

            <TextItemAccount textLeft={languages['vi'].numberPhone}>
              <TextInput
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                placeholder={userState.phoneNumber}
                value={values.phoneNumber}
                style={styles.inputDDefault}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={GlobalStyles.textError}>{errors.phoneNumber}</Text>
              )}
            </TextItemAccount>

            <TextItemAccount textLeft={languages['vi'].email}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder={userState.email}
                value={values.email}
                style={styles.inputDDefault}
              />
              {touched.email && errors.email && (
                <Text style={GlobalStyles.textError}>{errors.email}</Text>
              )}
            </TextItemAccount>

            <TextItemAccount textLeft={languages['vi'].gender}>
              <TextInput
                onChangeText={handleChange('gender')}
                onBlur={handleBlur('gender')}
                placeholder={userState.gender}
                value={values.gender}
                style={styles.inputDDefault}
              />
            </TextItemAccount>

            <TextItemAccount textLeft={languages['vi'].schoolYear}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                onChangeText={handleChange('schoolYear')}
                onBlur={handleBlur('schoolYear')}
                placeholder={userState.schoolYear}
                value={userState.schoolYear}
                style={styles.inputDDefault}
              />
            </TextItemAccount>

            <TextItemAccount textLeft={languages['vi'].typeTraining}>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                onChangeText={handleChange('typeTraining')}
                onBlur={handleBlur('typeTraining')}
                placeholder={userState.typeTraining}
                value={userState.typeTraining}
                style={styles.inputDDefault}
              />
            </TextItemAccount>

            <View style={styles.viewBtn}>
              <CustomButton
                onPress={handleSubmit}
                style={styles.btn}
                title={languages['vi'].update}></CustomButton>
            </View>
          </>
        )}
      </Formik>
    );
  };

  const MyForm = withFormik<MyFormProps, FormValues>({
    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      // if (!values.name) {
      //   errors.name = 'Vui lòng nhập tên!';
      // }
      // if (!values.email) {
      //   errors.email = 'Vui lòng nhập email!';
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      // ) {
      //   errors.email = 'Định dạng email không đúng!';
      // }
      return errors;
    },

    handleSubmit: values => {
      console.log('handleSubmit - value', values);
    },
  })(InnerForm);

  return (
    <Modal visible>
      <View style={{backgroundColor: Colors.white}}>
        <Text style={styles.title}>{title}</Text>
        <CloseButton style={styles.logo} onPress={onPressClose} />
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          style={[styles.content]}
          // keyboardVerticalOffset={responsiveHeight(200)}
          // behavior={'padding'}
        >
          <MyForm />
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
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

  inputDDefault: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: responsiveWidth(15),
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
    width: responsiveWidth(70),
    height: responsiveHeight(80),
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
});
