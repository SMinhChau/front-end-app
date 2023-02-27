import {createSlice} from '@reduxjs/toolkit';
import authAPI from '../apis/auth';
import Major from '../../utilities/contants';
import tokenService from '../../services/token';
import {isNull, isNumber} from 'lodash';
import {number} from 'yup';
import MajorAPI from '../apis/major';
import majorAPI from '../apis/major';

interface StateType {
  major: Major;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  major: {
    id: '',
    name: '',
    headLecturer: {
      id: NaN,
      majors: {},
      degree: '',
      isAdmin: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  is_loading: false,
  error: false,
} as StateType;

export const MajorSlices = createSlice({
  name: 'major',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(majorAPI.getMajorById().pending, state => {
      state.is_loading = true;
    });
    builder.addCase(majorAPI.getMajorById().fulfilled, (state, action) => {
      console.log('state.action ', action);
      console.log('action.payload.major ', action.payload);
      state.major = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(majorAPI.getMajorById().rejected, state => {
      state.error = true;
      state.is_loading = false;
    });
  },
});
