import {axiosAuth} from '../utilities/axiosConfig';

class TopicService {
  getTopicId(id: number) {
    return axiosAuth({
      url: 'api/student/topics/' + id,
      method: 'get',
    });
  }
  getTopicList(termId: number) {
    return axiosAuth({
      url: `api/student/topics?termId=${termId}`,
      method: 'get',
    });
  }
}

const topicService = new TopicService();

export default topicService;
