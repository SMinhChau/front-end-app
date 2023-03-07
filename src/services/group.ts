import {axiosAuth} from '../utilities/axiosConfig';

class GroupService {
  getMyGroup(termId: number) {
    return axiosAuth({
      url: 'api/student/groups/me/' + termId,
      method: 'get',
    });
  }
  getGroupById(id: number) {
    return axiosAuth({
      url: 'api/student/groups/' + id,
      method: 'get',
    });
  }
  getListGroup(termId: number, topicId: number) {
    return axiosAuth({
      url: 'api/student/groups/' + termId + topicId,
      method: 'get',
    });
  }
  createGroup(data: any) {
    return axiosAuth({
      url: 'api/student/groups',
      method: 'post',
      data,
    });
  }
  outGroup(termId: number) {
    return axiosAuth({
      url: 'api/student/groups',
      method: 'delete',
      data: termId,
    });
  }
}

const groupService = new GroupService();
export default groupService;
