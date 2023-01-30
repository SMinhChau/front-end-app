import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  getAccessToken = async () => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      return value;
    }
  };

  setAccessToken = async (token: string) => {
    const value = await AsyncStorage.setItem('access_token', token);
    if (value !== null) {
      return value;
    }
  };

  getRefreshToken = async () => {
    const value = await AsyncStorage.getItem('refresh_token');
    return value;
  };

  setRefreshToken = async (token: string) => {
    const value = await AsyncStorage.setItem('refresh_token', token);
    return value;
  };

  reset = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };
}

const tokenService = new TokenService();
export default tokenService;
