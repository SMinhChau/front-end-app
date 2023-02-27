import axios, {AxiosRequestHeaders} from 'axios';
import Config from 'react-native-config';
import tokenService from '../services/token';

const axiosAuth = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(
  async config => {
    const access_token = await tokenService.getAccessToken();
    console.log('access_token', access_token);

    (config.headers as AxiosRequestHeaders).Authorization =
      'Bearer ' + access_token;
    return config;
  },
  error => Promise.reject(error),
);

axiosAuth.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const config = error.config;
    // Access Token was expired
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refresh_token = await tokenService.getRefreshToken();
        console.log('refresh_token', refresh_token);

        if (await refresh_token) {
          const res = await axios({
            url: URL + '/api/student/auth/Refresh-token',
            method: 'post',
            data: {
              refreshToken: tokenService.getRefreshToken(),
            },
          });
          if (res.data.accessToken) {
            tokenService.setAccessToken(res.data.accessToken);
            tokenService.setRefreshToken(res.data.refreshToken);
          }
          return axiosAuth(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

const axiosNotAuth = axios.create();

axiosNotAuth.interceptors.request.use(
  config => {
    config.baseURL = Config.API_URL;
    console.log(' Config.API_URL', Config.API_URL);
    return config;
  },
  error => Promise.reject(error),
);

export {axiosAuth, axiosNotAuth};
