import {log} from 'react-native-reanimated';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native/Libraries/Alert/Alert';
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

  outMyGroup() {
    return createAsyncThunk(
      'group/out-group-by-termId',
      async (termId: number) => {
        console.log('group/out-group-by-termId', termId);
        try {
          const result = await groupService.outGroup(termId);
          console.log(
            'group/out-group-by-termId ===============result',
            result,
          );
          if (result.status === 200) {
            return result.data;
          }
        } catch (error) {
          console.log('error', error);
        }
      },
    );
  }

  createGroup() {
    return createAsyncThunk(
      'group/create-my-group',
      async (data: {termId: number; name: string}) => {
        try {
          const result = await groupService.createGroup(data);
          console.log('group/create-my-group', result);

          if (result.status === 200) return result.data;
        } catch (error) {
          console.log('group/create-my-group error', error);
        }
      },
    );
  }
}

const groupAPI = new GroupAPI();

export default groupAPI;
