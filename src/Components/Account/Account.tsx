import {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import GlobalStyles from '../../common/styles/GlobalStyles';

const Account: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <>
      <Header
        title="Thông tin"
        iconLeft={true}
        home={true}
        iconRight={true}></Header>

      <View style={styles.content}>
        <Text style={GlobalStyles.textPrimary}>Account</Text>
      </View>
    </>
  );
};
export default Account;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
