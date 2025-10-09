import { Map } from './map.type';

export interface TaskObject {
  id: string;
  mapId: string;
  name: string;
  imageUrl: string;
  locationId: string;
}

export interface TaskLocation {
  id: string;
  mapId: string;
  name: string;
}

export interface LocationWithMap extends Omit<TaskLocation, 'mapId'> {
  map: Map;
}

export interface ObjectWithLocation extends Omit<TaskObject, 'locationId'> {
  location: TaskLocation;
}
