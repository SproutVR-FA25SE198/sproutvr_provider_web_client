export type MasterSubject = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
};

export type Subject = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  masterSubjectId: string;
};
