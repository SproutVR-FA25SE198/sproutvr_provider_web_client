import { GetAllMapsRequest } from '@/features/catalog/services/map.service';

import { GetMapsResponse } from '../types';
import http from '../utils/http';

export const GET_ALL_MAPS_QUERY_KEY = 'GET_ALL_MAPS_QUERY_KEY';

export const GET_MAPS_STALE_TIME = 30 * 1000; // 30 seconds
export const GET_MAPS_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export const getAllMaps = ({ pageIndex, pageSize, searchKeyword, subjectIds, sortBy }: GetAllMapsRequest) => {
  const result = http.get<GetMapsResponse>(`/catalogs/maps`, {
    params: {
      pageIndex,
      pageSize,
      searchKeyword,
      subjectIds,
      sortBy,
    },
  });
  return result;
};
