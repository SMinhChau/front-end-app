import User from '../contants';
import Lecturer from './Lecturer';

export default interface Transcript {
  student: User;
  gradeSummary: number;
  missings: Array<{}>;
  achievements: [
    {
      id: number;
      name: string;
      bonusGrade: number;
      student: User;
    },
  ];
  ADVISOR: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
  REVIEWER: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
  SESSION_HOST: {
    avgGrader: number;
    details: Array<Lecturer>;
  };
}
