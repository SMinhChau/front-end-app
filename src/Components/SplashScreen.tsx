import {useEffect} from 'react';
import {ActivityIndicator, View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../common/logo';
import GlobalStyles from '../common/styles/GlobalStyles';
import Colors from '../Themes/Colors';
import RouteNames from './RouteNames';
import {navigateAndSimpleReset} from './utils';
import {Images} from '../assets/images/Images';

const SplashScreen = () => {
  const navigation = useNavigation();

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );

    navigation.navigate('Login');
    // navigateAndSimpleReset(RouteNames.rootTabNavigation);
  };

  useEffect(() => {
    init();
  });

  return (
    <>
      <View style={styles.content}>
        <Image source={Images.background_flast} style={styles.bg} />
        <Logo height={300} width={300} tintColor={Colors.black} />
        <ActivityIndicator size={'large'} color={Colors.primaryButton} />
        <Text style={GlobalStyles.textPrimary}>Xin chào!</Text>
      </View>
    </>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
