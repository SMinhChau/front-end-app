import Topic from './Topic';

export default interface Group {
  id: number;
  name: string;
  term: {
    id: number;
  };
  status: string;
  topic: Topic;
  members: [
    {
      id: number;
      student: {
        id: number;
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
      };
      group: {
        id: number;
      };
    },
  ];
}
