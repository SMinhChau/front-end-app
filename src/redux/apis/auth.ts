import {log} from 'react-native-reanimated';
import {createAsyncThunk} from '@reduxjs/toolkit';
import RouteNames from '../../Components/RouteNames';
import authService from '../../services/auth';
import tokenService from '../../services/token';
import User from '../../utilities/contants';

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
        console.log('authService.login(data)', data);
        const result = await authService.login(data);
        console.log('result', result);

        if (result.status === 200) {
          await tokenService.setAccessToken(result.data.accessToken);

          await tokenService.setRefreshToken(result.data.refreshToken);

          return result.data;
        }
        return thunkAPI.rejectWithValue('login fail');
      },
    );
  }

  updateUserInfo() {
    return createAsyncThunk(
      'user/update-info',
      async (data: FormData, thunkAPI) => {
        console.log('user/update-info update data', data);
        try {
          const result = await authService.updateUserInfo(data);
          console.log('updateUserInfo ======result', result);
          if (result.status === 200) return result.data;
        } catch (error) {
          console.log(' updateUserInfo ======error', error);
          return thunkAPI.rejectWithValue('update fail');
        }
      },
    );
  }
}

const authAPI = new AuthAPI();

export default authAPI;
