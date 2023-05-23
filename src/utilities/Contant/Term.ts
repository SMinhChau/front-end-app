export default interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  startDateSubmitTopic: string;
  endDateSubmitTopic: string;
  startDateChooseTopic: string;
  endDateChooseTopic: string;
  dateDiscussion: string;
  dateReport: string;
  createdAt: string;
  updatedAt: string;
  startDateDiscussion: string;
  endDateDiscussion: string;
  startDateReport: string;
  endDateReport: string;
  majors: {
    id: number;
  };
  isPublicResult: number;
}
