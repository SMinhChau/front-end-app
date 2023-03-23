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
  updated: boolean;
  updateError: boolean;
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
  is_login: false,
  updated: false,
  updateError: false,
} as StateType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(authAPI.login().fulfilled, (state, action) => {
      console.log('action user login', action);

      state.user = action.payload.user;
      state.error = false;
      state.is_login = true;
    });
    builder.addCase(authAPI.login().rejected, state => {
      state.is_login = false;
      state.error = true;
    });

    builder.addCase(authAPI.getInfo().fulfilled, (state, action) => {
      console.log('action getInfo', action.payload);

      state.user = action.payload;
    });

    builder.addCase(authAPI.updateUserInfo().pending, (state, action) => {
      console.log('action updateUserInfo pending', action);
      state.error = false;
    });
    builder.addCase(authAPI.updateUserInfo().fulfilled, (state, action) => {
      console.log('action updateUserInfo fulfilled', action);

      state.user = action.payload;
      state.updated = true;

      state.updateError = false;
    });
    builder.addCase(authAPI.updateUserInfo().rejected, state => {
      state.updateError = true;
    });
  },
});
