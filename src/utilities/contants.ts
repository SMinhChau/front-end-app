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
