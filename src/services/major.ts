import {axiosAuth} from '../utilities/axiosConfig';

class MajorService {
  getMajorById(id: number) {
    console.log('getMajorById', id);
    return axiosAuth({
      url: 'api/student/majors/' + id,
      method: 'get',
    });
  }
}

const majorService = new MajorService();

export default majorService;
