import {useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Themes/Colors';
import Lottie from 'lottie-react-native';

import {Images} from '../assets/images/Images';
import RouteNames from './RouteNames';
import tokenService from '../services/token';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

import authAPI from '../redux/apis/auth';
import authService from '../services/auth';
import {setUser} from '../redux/slices/UserSlices';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user.user);

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    getInfoUser();
  };

  const getInfoUser = async () => {
    const token = await tokenService.getRefreshToken();

    console.log(' getRefreshToken token -> ', token);

    if (token !== null) {
      await authService
        .getInfo()
        .then(result => {
          console.log('getInfo', result);
          dispatch(setUser(result.data));
        })
        .catch(er => console.log('er getInfo', er));
      navigation.navigate(RouteNames.TabNavigation);
    } else navigation.navigate(RouteNames.loginNavigation);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'#3355f0'} />
      <View style={styles.content}>
        <Image source={Images.background_flast} style={styles.bg} />
        <Lottie
          source={require('../../src/assets/jsonAmination/start_screen.json')}
          autoPlay
          loop
          style={styles.logo}
        />
        <View style={styles.cotent}>
          <ActivityIndicator size={'large'} color={'#bec7ef'} />
          <Text style={styles.title}>Xin Chào!</Text>
        </View>
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
  logo: {},
  cotent: {
    position: 'relative',

    top: 160,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.headerColor,
  },
});
