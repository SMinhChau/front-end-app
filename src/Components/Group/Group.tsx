import {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import Logo from '../../common/logo';
import GlobalStyles from '../../common/styles/GlobalStyles';

const Group: React.FC<{}> = () => {
  return (
    <>
      <View style={styles.content}>
        <Logo height={300} width={300} />

        <Text style={GlobalStyles.textPrimary}>Xin chào!</Text>
      </View>
    </>
  );
};
export default Group;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
