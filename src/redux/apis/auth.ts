import {createAsyncThunk} from '@reduxjs/toolkit';
import RouteNames from '../../Components/RouteNames';
import authService from '../../services/auth';
import tokenService from '../../services/token';

class AuthAPI {
  getInfo() {
    return createAsyncThunk('user/get-info', async () => {
      console.log('getInfo result ne');
      const result = await authService.getInfo();
      if (result.status === 200) return result.data;
    });
  }
  login() {
    return createAsyncThunk(
      'user/login',
      async (data: {username: string; password: string}, thunkAPI) => {
        const result = await authService.login(data);
        console.log('authService.login(data)', result.data);
        if (result.status === 200) {
          await tokenService.setAccessToken(result.data.accessToken);

          await tokenService.setRefreshToken(result.data.refreshToken);

          return result.data;
        }
        return thunkAPI.rejectWithValue('login fail');
      },
    );
  }
}

const authAPI = new AuthAPI();

export default authAPI;
