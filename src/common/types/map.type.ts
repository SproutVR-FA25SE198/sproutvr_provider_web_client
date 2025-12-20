import { Pagination } from './response.type';
import { SubjectWithMaster } from './subject.type';
import { TaskLocation, TaskObject } from './task.type';

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

export interface MapSummary {
  mapId: string;
  mapCode: string;
  mapName: string;
  imageUrl: string;
  subjectName: string;
}

export interface GetMapsResponse extends Pagination<MapWithSubject> { }

export interface GetLibraryResponse extends Pagination<MapSummary> { }

export interface GetMapByIdResponse extends MapWithSubject {
  mapObjects: TaskObject[];
  taskLocations: TaskLocation[];
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface MapDetails extends Omit<GetMapByIdResponse, 'imageUrl'> {
  imageUrl: string[];
}
