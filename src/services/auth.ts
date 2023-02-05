import {axiosNotAuth} from '../utilities/axiosConfig';

class AuthService {
  login(data: {username: string; password: string}) {
    return axiosNotAuth({
      url: '/api/student/auth/login',
      method: 'post',
      data,
    });
  }
}

const authService = new AuthService();
export default authService;
