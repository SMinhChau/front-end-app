import axios from 'axios';
import Config from 'react-native-config';
import {axiosAuth, axiosNotAuth} from '../utilities/axiosConfig';
import tokenService from './token';

class AuthService {
  login(data: {username: string; password: string}) {
    console.log('data - AuthService', data);
    return axiosNotAuth({
      url: 'api/student/auth/login',
      method: 'post',
      data,
    });
  }
  getInfo() {
    return axiosAuth({
      url: 'api/student/me',
      method: 'get',
    });
  }

  updateUserInfo(data: FormData) {
    return axios({
      method: 'put',
      url: `${Config.API_URL}api/student/me`,
      data,
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer  ${tokenService.getAccessToken()}`,
      },
    });
  }
}

const authService = new AuthService();
export default authService;
