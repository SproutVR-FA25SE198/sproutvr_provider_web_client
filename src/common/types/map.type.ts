import { SubjectWithMaster } from './subject.type';
import { TaskObject } from './task.type';

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

export interface MapMetadata {
  mapId: string;
  mapCode: string;
  description: string;
  imageUrl: string;
  activityTypes: string[];
  taskLocations: number;
  taskLocationImage: string;
  totalTaskObjects: number;
  taskObjects: TaskObject[];
}
