import {axiosAuth} from '../utilities/axiosConfig';

class TopicService {
  getMajorById(id: number) {
    console.log('getTopicById', id);
    return axiosAuth({
      url: 'api/student/topics/' + id,
      method: 'get',
    });
  }
}

const topicService = new TopicService();

export default topicService;
