import {log} from 'react-native-reanimated';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native/Libraries/Alert/Alert';
import groupService from '../../services/group';

class GroupAPI {
  getMyGroup() {
    return createAsyncThunk('group/get-my-group', async (termId: number) => {
      console.log('>getMyGroup termId', termId);

      const result = await groupService.getMyGroup(termId);
      if (result.status === 200) return result.data;
    });
  }

  getGroupById() {
    return createAsyncThunk('group/get-group-by-id', async (id: number) => {
      const result = await groupService.getGroupById(id);

      if (result.status === 200) return result.data;
    });
  }

  outMyGroup() {
    return createAsyncThunk(
      'group/out-group-by-termId',
      async (termId: number, thunkAP) => {
        try {
          const result = await groupService.outGroup(termId);
          if (result.status === 200) {
            return result.data;
          }
          return thunkAP.rejectWithValue('Xóa nhóm không thành công');
        } catch (error) {
          console.log('error', error);
        }
      },
    );
  }

  createGroup() {
    return createAsyncThunk(
      'group/create-my-group',
      async (data: {termId: number; name: string}, thunkAP) => {
        try {
          const result = await groupService.createGroup(data);

          if (result.status === 200) {
            return result.data;
          }
          return thunkAP.rejectWithValue('Tạo nhóm không thành công');
        } catch (error) {
          console.log('group/create-my-group error', error);
        }
      },
    );
  }
}

const groupAPI = new GroupAPI();

export default groupAPI;
