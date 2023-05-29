export default interface Topic {
  id: number;
  name: string;
  quantityGroupMax: number;
  description: string;
  note: string;
  target: string;
  standradOutput: string;
  requireInput: string;
  comment: string;
  status: string;
  createdt: string;
  updatedt: string;
  lecturer: {
    id: number;
    username: string;
    avatar: string;
    phoneNumber: string;
    email: string;
    name: string;
    gender: string;
    createdt: string;
    updatedt: string;
    majors: {
      id: number;
    };
    degree: string;
    isdmin: string;
  };
  term: {
    id: number;
  };
  totalGroupChoose: number;
  level: string;
}
