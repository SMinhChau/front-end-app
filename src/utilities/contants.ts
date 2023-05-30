import RouteNames from '../Components/RouteNames';

export default interface User {
  id: string;
  username: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  name: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  majors: {
    id: number;
  };
  typeTraining: string;
  schoolYear: string;
}

export default interface Major {
  id: string;
  name: string;
  headLecturer: {
    id: number;
    majors: Object;
    degree: string;
    isAdmin: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const NUMBER = 'number';

export const enum TypeDegree {
  Masters = 'masters',
  Docter = 'doctor',
}

export const enum TypeTraining {
  College = 'college',
  University = 'university',
}

export const enum TypeStatusTopic {
  Refuse = 'refuse',
  Peding = 'peding',
  Accept = 'accept',
}

export const enum TypeGender {
  Male = 'male',
  Female = 'female',
}
export const TypeRequestGroup = {
  REQUEST_JOIN: 'REQUEST_JOIN',
  REQUEST_INVITE: 'REQUEST_INVITE',
};

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const PASSWORD_REGEX = /^[5,]$/;

export const checkRole = (role: string) => {
  if (role === 'LECTURER') return 'Giảng Viên';
  if (role === 'SUB_HEAD_LECTURER') return 'Phó Khoa';
  if (role === 'HEAD_LECTURER') return 'Trưởng Khoa';
};
export const checkGenger = (role: string) => {
  if (role === 'MALE') return 'Nam';
  if (role === 'FEMALE') return 'Nữ';
};
export const checkDegree = (role: string) => {
  if (role === 'MASTERS') return 'Tiến sĩ';
  if (role === 'DOCTER') return 'Thạc sĩ';
};
export const checkTypeTraining = (role: string) => {
  if (role === 'COLLEGE') return 'Đại học';
  if (role === 'UNIVERSITY') return 'Cao đẳng';
};

export const removeAccents = (str: string) => {
  var AccentsMap = [
    'aàảãáạăằẳẵắặâầẩẫấậ',
    'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
    'dđ',
    'DĐ',
    'eèẻẽéẹêềểễếệ',
    'EÈẺẼÉẸÊỀỂỄẾỆ',
    'iìỉĩíị',
    'IÌỈĨÍỊ',
    'oòỏõóọôồổỗốộơờởỡớợ',
    'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
    'uùủũúụưừửữứự',
    'UÙỦŨÚỤƯỪỬỮỨỰ',
    'yỳỷỹýỵ',
    'YỲỶỸÝỴ',
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

export type ITypeNotificationLecturer =
  | 'ACHIEVEMENT'
  | 'STUDENT'
  | 'GROUP_MEMBER'
  | 'CHOOSE_TOPIC'
  | 'NEW_GROUP_MEMBER'
  | 'REQUEST_JOIN_GROUP';

export const TypeNotificationPath: Record<
  ITypeNotificationLecturer | string,
  string
> = {
  ACHIEVEMENT: RouteNames.EvaluationTab,
  STUDENT: RouteNames.AccountTab,
  GROUP_MEMBER: RouteNames.GroupTab,
  CHOOSE_TOPIC: RouteNames.TopicMenu,
  NEW_GROUP_MEMBER: RouteNames.GroupTab,
  REQUEST_JOIN_GROUP: RouteNames.InviteJoinGroup,
};

export const getStatusGroupColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'green';
    case 'FAIL_ADVISOR':
      return 'red';
    case 'FAIL_REVIEWER':
      return 'red';
    case 'red':
      return 'Rớt hội đồng';
    case 'green':
      return 'Đậu phản biện';
    case 'PASS_REVIEWER':
      return 'green';
    case 'PASS_SESSION_HOST':
      return 'green';
  }
};

export const getStatusGroup = (status: string) => {
  switch (status) {
    case 'OPEN':
      return 'Nhóm mới tạo';
    case 'FAIL_ADVISOR':
      return 'Rớt hướng dẫn';
    case 'FAIL_REVIEWER':
      return 'Rớt phản biện';
    case 'FAIL_SESSION_HOST':
      return 'Rớt hội đồng';
    case 'PASS_ADVISOR':
      return 'Đậu hướng dẫn';
    case 'PASS_REVIEWER':
      return 'Đậu phản biện';
    case 'PASS_SESSION_HOST':
      return 'Đậu hội dồng';
  }
};

export const getLevelTopic = (text: string) => {
  switch (text) {
    case 'HIGH':
      return 'Rất khó';
    case 'MEDIUM':
      return 'Khó';
    case 'LOW':
      return 'Trung Bình';
    case null:
      return 'Chưa xác định';
  }
};

export const getLevelColorTopic = (text: string) => {
  switch (text) {
    case 'HIGH':
      return 'orange';
    case 'MEDIUM':
      return 'purple';
    case 'LOW':
      return 'bule';
  }
};

export const getNameStatus = (value: string) => {
  if (value === 'REFUSE') return 'Không được duyệt';
  if (value === 'PEDING') return 'Đang chờ';
  if (value === 'ACCEPT') return 'Đã duyệt';
};
export const getNameColorStatus = (value: string) => {
  switch (value) {
    case 'REFUSE':
      return 'red';
    case 'PEDING':
      return 'green';
    case 'ACCEPT':
      return 'blue';
  }
};
