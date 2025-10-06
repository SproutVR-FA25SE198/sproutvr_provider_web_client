export interface MasterSubject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  masterSubjectId: string;
}

export interface SubjectWithMaster extends Omit<Subject, 'masterSubjectId'> {
  masterSubject: MasterSubject;
}
