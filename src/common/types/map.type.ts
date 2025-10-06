import { SubjectWithMaster } from './subject.type';

export interface Map {
  id: string;
  mapCode: string;
  price: number;
  name: string;
  description: string;
  imageUrl: string;
  status: string;
  subjectId: string;
}

export interface MapWithSubject extends Omit<Map, 'subjectId'> {
  subject: SubjectWithMaster;
}
