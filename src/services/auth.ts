import {log} from 'react-native-reanimated';
import axios from 'axios';
import Config from 'react-native-config';
import {axiosAuth, axiosFormData, axiosNotAuth} from '../utilities/axiosConfig';
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

  updateUserInfo = async (data: FormData) => {
    return axiosFormData({
      url: 'api/student/me',
      method: 'put',
      data,
    });
  };

  getStudent(termId: number, groupExists: boolean) {
    return axiosAuth({
      url: `api/student/students?termId=${termId}&groupExists=${groupExists}`,
      method: 'get',
    });
  }
}

const authService = new AuthService();
export default authService;
