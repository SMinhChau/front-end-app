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
