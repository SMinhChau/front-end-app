import {createAsyncThunk} from '@reduxjs/toolkit';
import topicService from '../../services/topic';
import {setTopic} from '../slices/TopicSlices';

class TopicAPI {
  getTopicById() {
    return createAsyncThunk('topic/get-topic-by-id', async (id: number) => {
      const result = await topicService.getTopicId(id);
      if (result.status === 200) return result.data;
    });
  }

  chooseTopic() {
    return createAsyncThunk(
      'topic/chosse-topic',
      async (data: {termId: number; topicId: number}, thunkAP) => {
        const result = await topicService.chooseTopic(data);

        if (result.status === 200) {
          return result.data;
        }
      },
    );
  }
}

const topicAPI = new TopicAPI();

export default topicAPI;
