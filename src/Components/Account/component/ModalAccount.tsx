import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  deviceWidth,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';

import {useAppSelector} from '../../../redux/hooks';

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

const ModalAccount: React.FC<Props> = ({title, onPressClose}) => {
  const userState = useAppSelector(state => state.user.user);
  const [checked, setChecked] = useState('male');

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [gender, setGender] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [special, setSpecial] = useState('');

  const [typeTraining, setTypeTraining] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [email, setEmail] = useState('');

  const onChangeText = (text: string) => setUsername(text);

  const hasErrors = () => {
    return !username.includes('');
  };

  const handleSubmitForm = () => {};
  return (
    <Portal>
      <Modal visible>
        <View style={{backgroundColor: Colors.white}}>
          <Text style={styles.title}>{title}</Text>
          <CloseButton style={styles.logo} onPress={onPressClose} />
        </View>
        <ScrollView>
          <View style={styles.contentForm}>
            <TextInput
              disabled
              placeholder={userState?.name}
              label={languages['vi'].code}
              style={styles.inputDefault}
              value={userState?.username}
              onChangeText={onChangeText}
            />

            <TextInput
              placeholder={userState?.name}
              label={languages['vi'].name}
              style={styles.inputDefault}
              value={name}
              onChangeText={onChangeText}
            />
            {/* <HelperText type="error" visible={hasErrors()}>
              Email address is invalid!
            </HelperText> */}

            <View style={styles.contentRadio}>
              <Text style={styles.lable}>{languages['vi'].gender}</Text>
              <View style={styles.leftRadio}>
                <View style={styles.rowRadio}>
                  <RadioButton
                    value="male"
                    color={Colors.primaryButton}
                    status={checked === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('male')}
                  />
                  <Text style={styles.lable}>Nam</Text>
                </View>

                <View style={styles.rowRadio}>
                  <RadioButton
                    value="female"
                    color={Colors.primaryButton}
                    status={checked === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('female')}
                  />
                  <Text style={styles.lable}>Nữ</Text>
                </View>
              </View>
            </View>

            <TextInput
              placeholder={userState?.schoolYear}
              label={languages['vi'].schoolYear}
              style={styles.inputDefault}
              value={schoolYear}
              onChangeText={onChangeText}
            />

            <TextInput
              placeholder={userState?.typeTraining}
              label={languages['vi'].typeTraining}
              style={styles.inputDefault}
              value={typeTraining}
              onChangeText={onChangeText}
            />
            <TextInput
              placeholder={userState?.phoneNumber}
              label={languages['vi'].numberPhone}
              style={styles.inputDefault}
              value={phoneNumber}
              onChangeText={onChangeText}
            />

            <TextInput
              placeholder={userState?.email}
              label={languages['vi'].email}
              style={styles.inputDefault}
              value={email}
              onChangeText={onChangeText}
            />

            <View style={styles.viewBtn}>
              <CustomButton
                onPress={() => handleSubmitForm()}
                style={styles.btn}
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
  contentForm: {
    backgroundColor: Colors.white,
  },
  contentRadio: {
    flexDirection: 'column',
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(16),
  },
  viewRadio: {
    paddingHorizontal: responsiveWidth(10),
    flexDirection: 'row',
  },

  leftRadio: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
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
});
