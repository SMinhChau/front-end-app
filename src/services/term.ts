import {axiosAuth} from '../utilities/axiosConfig';

class TermService {
  getLastTerm(majorsId: number) {
    return axiosAuth({
      url: `api/student/terms/last-term?majorsId=${majorsId}`,
      method: 'get',
    });
  }
}

const termService = new TermService();

export default termService;
