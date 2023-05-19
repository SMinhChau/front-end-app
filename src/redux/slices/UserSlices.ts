import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import authAPI from '../apis/auth';
import User from '../../utilities/contants';
import Transcript from '../../utilities/Contant/Transcript';
interface StateType {
  user: User;
  error: boolean;
  is_loading: boolean;
  is_login: boolean;
  updated: boolean;
  updateError: boolean;
  transcript: Transcript;
  allow: boolean;
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
  transcript: {
    student: {},
    gradeSummary: NaN,
    missings: {},
    achievements: [
      {
        id: NaN,
        name: '',
        bonusGrade: NaN,
        student: {},
      },
    ],
    ADVISOR: {
      avgGrader: NaN,
      details: {},
    },
    REVIEWER: {
      avgGrader: NaN,
      details: {},
    },
    SESSION_HOST: {
      avgGrader: NaN,
      details: {},
    },
  },
  allow: true,
} as StateType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAllow: (state, action) => {
      console.log('-======> setAllow', action);
      state.allow = action.payload;
    },
    setTranscript: (state, action: PayloadAction<Transcript>) => {
      state.transcript = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(authAPI.login().fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = false;
      state.is_login = true;
    });
    builder.addCase(authAPI.login().rejected, state => {
      state.is_login = false;
      state.error = true;
    });

    builder.addCase(authAPI.getInfo().fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(authAPI.getTranscripts().fulfilled, (state, action) => {
      console.log('======transcript  action', action);
      state.transcript = action.payload;
    });
  },
});

export const {updateUser, setUser, setAllow, setTranscript} = userSlice.actions;
