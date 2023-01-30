import {createSlice} from '@reduxjs/toolkit';

interface User {
  username: string;
  avatar: string;
  fullName: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

interface StateType {
  user: User;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {},
});
