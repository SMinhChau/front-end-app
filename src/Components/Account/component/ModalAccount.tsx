import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Button,
  TextInput,
} from 'react-native';
import ButtonView from '../../../common/ButtonView';
import CloseButton from '../../../common/CloseButton';
import Colors from '../../../Themes/Colors';
import {
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../../../utilities/sizeScreen';
interface Props {
  title: string;
  onPressClose(): any;
}
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalAccount: React.FC<Props> = ({title, onPressClose}) => {
  return (
    <Modal visible transparent animationType={'slide'}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={{backgroundColor: Colors.white}}>
        <View style={[styles.container]}>
          <CloseButton onPress={onPressClose} />

          <KeyboardAvoidingView
            behavior={'height'}
            style={{
              flex: 1,
            }}>
            <Text style={styles.title}>{title}</Text>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: responsiveHeight(16),
              }}></View>
            <Text style={styles.orText}>Thoong tin </Text>
            <TextInput
              // onChangeText={handleChange('username')}
              // onBlur={handleBlur('username')}
              placeholder={'Tên đăng nhập'}
              // value={values.username}
              style={styles.input}
              // ref={userNameRef.current}
            />
            {/* {touched.username && errors.username && (
              <Text style={GlobalStyles.textError}>{errors.username}</Text>
            )} */}
            {/* <ButtonView title="Modal"></ButtonView> */}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Modal>
  );
};
export default ModalAccount;

const styles = StyleSheet.create({
  container: {width, backgroundColor: Colors.primary},
  logo: {
    width: responsiveWidth(92),
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: responsiveHeight(15),
  },
  title: {
    // fontFamily: Fonts.fontSemiBold,
    fontSize: responsiveFont(20),
    color: Colors.textPrimary,
    textAlign: 'center',
    marginTop: responsiveHeight(20),
  },
  orText: {
    // fontFamily: Fonts.fontMedium,
    fontSize: responsiveFont(14),
    color: Colors.grayLight,
    textAlign: 'center',
    marginTop: responsiveHeight(44),
    marginBottom: responsiveHeight(16),
  },
  errorText: {
    // fontFamily: Fonts.fontRegular,
    fontSize: responsiveFont(13),
    color: Colors.red,
    textAlign: 'center',
    marginTop: responsiveHeight(16),
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 99999999,
    bottom: responsiveHeight(30),
    width: '100%',
    alignSelf: 'center',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    width,
    height,
    zIndex: 999999,
    backgroundColor: 'transparent',
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 15,
    marginTop: 25,
    fontSize: 16,
  },
});
