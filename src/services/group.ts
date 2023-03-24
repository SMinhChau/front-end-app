import {axiosAuth} from '../utilities/axiosConfig';

class GroupService {
  getMyGroup(termId: number) {
    console.log(' getMyGroup termId', termId);

    return axiosAuth({
      url: `api/student/groups/me?termId=${termId}`,
      method: 'get',
    });
  }
  getGroupById(id: number) {
    return axiosAuth({
      url: 'api/student/groups/' + id,
      method: 'get',
    });
  }
  getListGroup(termId: number) {
    return axiosAuth({
      url: `api/student/groups?termId=${termId}`,
      method: 'get',
    });
  }
  createGroup(data: {termId: number; name: string}) {
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
      data: {termId},
    });
  }

  sendRequestGroup(groupId: number) {
    return axiosAuth({
      url: `api/student/groups/${groupId}/send-requests`,
      method: 'post',
    });
  }
}

const groupService = new GroupService();
export default groupService;
