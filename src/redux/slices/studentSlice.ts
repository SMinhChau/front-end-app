import {createSlice} from '@reduxjs/toolkit';
import tokenService from '../../services/token';
import authAPI from '../apis/studentApi';

interface Student {
  username: string;
  avatar: string;
  fullName: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface StateType {
  user: Student;
  isloading: boolean;
  error: boolean;
  is_login: boolean;
}

const initialState = {
  user: {
    username: '',
    avatar: '',
    fullName: '',
    email: '',
  },
  error: false,
  is_login: false,
  isloading: false,
} as StateType;

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(authAPI.login().fulfilled, (state, action) => {
      tokenService.setAccessToken(action.payload.access_token);
      tokenService.setRefreshToken(action.payload.refresh_token);
      state.error = false;
      state.is_login = true;
    });
    builder.addCase(authAPI.login().rejected, state => {
      state.is_login = false;
      state.error = true;
    });
  },
});
