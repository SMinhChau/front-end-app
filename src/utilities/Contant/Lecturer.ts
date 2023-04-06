export default interface Lecturer {
  id: number;
  username: string;
  avatar: string;
  createdAt: string;
  degree: string;
  email: string;
  name: string;
  gender: string;
  phoneNumber: string;
  updatedAt: string;
  majors: {
    id: number;
  };
  role: string;
}
