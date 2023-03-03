import {axiosAuth, axiosNotAuth} from '../utilities/axiosConfig';

class AuthService {
  async login(data: {username: string; password: string}) {
    console.log('data - AuthService', data);
    return await axiosNotAuth({
      url: 'api/student/auth/login',
      method: 'post',
      data,
    });
  }
  getInfo() {
    return axiosAuth({
      url: 'api/student/me',
    });
  }
}

const authService = new AuthService();
export default authService;
