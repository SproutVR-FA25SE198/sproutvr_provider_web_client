import { GetMapByIdResponse } from '@/common/types';
import http from '@/common/utils/http';

export const GET_MAP_BY_ID_QUERY_KEY = 'GET_MAP_BY_ID_QUERY_KEY';
export const GET_MAPS_STALE_TIME = 30 * 1000; // 30 seconds
export const GET_MAPS_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

const BASE_URL = '/catalogs/maps';

export interface GetMapByIdRequest {
  mapId: string;
}

//Get map by id
export const getMapById = (mapId: string) => {
  return http.get<GetMapByIdResponse>(`${BASE_URL}/${mapId}`);
};

//Get maps by subject id
