import {createSlice} from '@reduxjs/toolkit';
import authAPI from '../apis/auth';
import User from '../../utilities/contants';
import tokenService from '../../services/token';
import {isNull, isNumber} from 'lodash';
import {number} from 'yup';

interface StateType {
  user: User;
  error: boolean;
  is_loading: boolean;
  is_login: boolean;
}

const initialState = {
  user: {
    id: '',
    username: '',
    avatar: '',
    phoneNumber: '',
    email: '',
    name: '',
    gender: '',
    createdAt: '',
    updatedAt: '',
    majors: {
      id: NaN,
    },
    typeTraining: '',
    schoolYear: '',
  },
  error: false,
  is_login: tokenService.getRefreshToken() !== null,
} as StateType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(authAPI.login().fulfilled, (state, action) => {
      tokenService.setAccessToken(action.payload.accessToken);
      tokenService.setRefreshToken(action.payload.refreshToken);

      state.user = action.payload.user;
      state.error = false;

      state.is_login = true;
    });
    builder.addCase(authAPI.login().rejected, state => {
      state.is_login = false;
      state.error = true;
    });
  },
});
