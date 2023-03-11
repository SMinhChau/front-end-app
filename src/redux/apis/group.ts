import {createAsyncThunk} from '@reduxjs/toolkit';
import groupService from '../../services/group';

class GroupAPI {
  getMyGroup() {
    return createAsyncThunk('group/get-my-group', async (termId: number) => {
      const result = await groupService.getMyGroup(termId);
      if (result.status === 200) return result.data;
    });
  }

  getGroupById() {
    return createAsyncThunk('group/get-group-by-id', async (id: number) => {
      console.log('group/get-group-by-id ', id);
      const result = await groupService.getGroupById(id);
      console.log('group/get-group-by-id result', result);
      if (result.status === 200) return result.data;
    });
  }
}

const groupAPI = new GroupAPI();

export default groupAPI;
