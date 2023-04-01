import {axiosAuth} from '../utilities/axiosConfig';

class TopicService {
  getTopicId(id: number) {
    return axiosAuth({
      url: `api/student/topics/${id}`,
      method: 'get',
    });
  }
  getTopicList(termId: number) {
    return axiosAuth({
      url: `api/student/topics?termId=${termId}`,
      method: 'get',
    });
  }
  chooseTopic(data: {termId: number; topicId: number}) {
    return axiosAuth({
      url: `api/student/groups/topic`,
      method: 'post',
      data,
    });
  }
  cancelTopic(termId: number) {
    return axiosAuth({
      url: `api/student/groups/topic`,
      method: 'delete',
      data: {termId},
    });
  }
}

const topicService = new TopicService();

export default topicService;
