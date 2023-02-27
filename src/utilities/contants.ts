export default interface User {
  id: string;
  username: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  name: string;
  gender: string;
  createdAt: any;
  updatedAt: any;
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
    createdAt: Date;
    updatedAt: Date;
  };
}

export const NUMBER = 'number';
