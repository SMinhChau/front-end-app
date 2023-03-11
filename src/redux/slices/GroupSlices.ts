import {createSlice} from '@reduxjs/toolkit';
import Group from '../../utilities/Contant/Group';
import groupAPI from '../apis/group';
import termrAPI from '../apis/term';

interface StateType {
  group: Group;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  group: {
    id: NaN,
    name: '',
    term: {
      id: NaN,
    },
    topic: {
      id: NaN,
    },
    members: [
      {
        id: NaN,
        student: {
          id: NaN,
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
        group: {
          id: NaN,
        },
      },
    ],
  },

  is_loading: false,
  error: false,
} as StateType;

export const GroupSlices = createSlice({
  name: 'group',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(groupAPI.getMyGroup().pending, state => {
      state.is_loading = true;
    });
    builder.addCase(groupAPI.getMyGroup().fulfilled, (state, action) => {
      console.log('GroupSlices action.payload', action);
      state.group = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(groupAPI.getMyGroup().rejected, state => {
      state.error = true;
      state.is_loading = false;
    });
  },
});
