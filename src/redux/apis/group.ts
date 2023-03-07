import {createAsyncThunk} from '@reduxjs/toolkit';
import groupService from '../../services/group';

class GroupAPI {
  getMyGroup() {
    return createAsyncThunk('group/get-my-group', async (termId: number) => {
      const result = await groupService.getMyGroup(termId);
      if (result.status === 200) return result.data;
    });
  }
}

const groupAPI = new GroupAPI();

export default groupAPI;
