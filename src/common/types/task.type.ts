import { Map } from './map.type';

export interface TaskObject {
  description: any;
  id: string;
  mapId: string;
  name: string;
  imageUrl: string;
  objectCode: string;
}

export interface TaskLocation {
  description: any;
  id: string;
  mapId: string;
  name: string;
  imageUrl: string;
  locationCode: string;
}

export interface LocationWithMap extends Omit<TaskLocation, 'mapId'> {
  map: Map;
}
