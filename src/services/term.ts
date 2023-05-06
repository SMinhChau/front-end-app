import {axiosAuth} from '../utilities/axiosConfig';

class TermService {
  getTermNow(majorsId: number) {
    return axiosAuth({
      url: `/api/student/terms/now?majorsId=${majorsId}`,
      method: 'get',
    });
  }
}

const termService = new TermService();

export default termService;
