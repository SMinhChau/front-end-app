import {createSlice} from '@reduxjs/toolkit';
import Term from '../../utilities/Contant/Term';
import termrAPI from '../apis/term';

interface StateType {
  term: Term;
  error: boolean;
  is_loading: boolean;
}

const initialState = {
  term: {
    id: NaN,
    name: '',
    startDate: '',
    endDate: '',
    startDateSubmitTopic: '',
    endDateSubmitTopic: '',
    startDateChooseTopic: '',
    endDateChooseTopic: '',
    dateDiscussion: '',
    dateReport: '',
    createdAt: '',
    updatedAt: '',
    majors: {
      id: NaN,
    },
  },
  is_loading: false,
  error: false,
} as StateType;

export const TermSlices = createSlice({
  name: 'term',
  initialState,
  reducers: {
    //
  },
  extraReducers: builder => {
    builder.addCase(termrAPI.getLastTerm().pending, state => {
      state.is_loading = true;
    });
    builder.addCase(termrAPI.getLastTerm().fulfilled, (state, action) => {
      console.log('TermSlices action.payload', action.payload);

      state.term = action.payload;
      state.is_loading = false;
      state.error = false;
    });
    builder.addCase(termrAPI.getLastTerm().rejected, state => {
      state.error = true;
      state.is_loading = false;
    });
  },
});
