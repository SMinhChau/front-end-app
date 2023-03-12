export default interface Topic {
  id: number;
  name: string;
  quantityroupMax: 11;
  description: string;
  note: string;
  target: string;
  standradutput: string;
  requireInput: string;
  comment: string;
  status: string;
  createdt: string;
  updatedt: string;
  lecturer: {
    id: number;
    username: string;
    avatar: string;
    phoneumber: string;
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
}
