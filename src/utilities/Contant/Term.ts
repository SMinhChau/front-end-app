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
  majors: {
    id: number;
  };
}
