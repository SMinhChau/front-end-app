import {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';

const Account: React.FC<{}> = () => {
  return (
    <>
      <View style={styles.content}>
        <Logo height={300} width={300} />

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
