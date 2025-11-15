import { GetMapsResponse } from '../types';
import http from '../utils/http';

export const GET_ALL_MAPS_QUERY_KEY = 'GET_ALL_MAPS_QUERY_KEY';

export const GET_MAPS_STALE_TIME = 30 * 1000; // 30 seconds
export const GET_MAPS_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export interface GetAllMapsRequest {
  pageIndex: number;
  pageSize: number;
  Name?: string;
  SubjectIds?: string[];
  Description?: string;
  MinPrice?: number;
  MaxPrice?: number;
  MapCode?: string;
  Status?: string;
  SortBy?: string;
}

export const getAllMaps = ({
  pageIndex,
  pageSize,
  Name,
  SubjectIds,
  Description,
  MinPrice,
  MaxPrice,
  MapCode,
  Status,
  SortBy,
}: GetAllMapsRequest) => {
  const searchParams = new URLSearchParams();
  
  // Add required params
  searchParams.append('pageIndex', String(pageIndex));
  searchParams.append('pageSize', String(pageSize));
  
  if (Name) searchParams.append('Name', Name);
  if (Description) searchParams.append('Description', Description);
  if (MinPrice !== undefined && MinPrice !== null) searchParams.append('MinPrice', String(MinPrice));
  if (MaxPrice !== undefined && MaxPrice !== null) searchParams.append('MaxPrice', String(MaxPrice));
  if (MapCode) searchParams.append('MapCode', MapCode);
  if (Status) searchParams.append('Status', Status);
  if (SortBy) searchParams.append('SortBy', SortBy);
  
  // Handle SubjectIds: add multiple query params with same name
  if (SubjectIds && Array.isArray(SubjectIds) && SubjectIds.length > 0) {
    const validIds = SubjectIds.filter((id) => id && id !== 'all');
    validIds.forEach((id) => {
      searchParams.append('subjectIds', id);
    });
  }

  // Build the full URL with query string
  const queryString = searchParams.toString();
  const url = queryString ? `/catalogs/maps?${queryString}` : '/catalogs/maps';

  const result = http.get<GetMapsResponse>(url);
  return result;
};
