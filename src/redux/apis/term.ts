import {createAsyncThunk} from '@reduxjs/toolkit';
import termService from '../../services/term';

class TermrAPI {
  getLastTerm() {
    return createAsyncThunk('term/get-term-last', async (majorsId: number) => {
      console.log('term/get-term-last', majorsId);
      try {
        const result = await termService.getLastTerm(majorsId);

        console.log('term/get-term-last redult', result);

        if (result.status === 200) return result.data;
      } catch (error) {
        console.log('createAsyncThunk Error!', error);
      }
    });
  }
}

const termrAPI = new TermrAPI();

export default termrAPI;
