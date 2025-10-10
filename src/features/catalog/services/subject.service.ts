import { Subject } from '@/common/types';
import http from '@/common/utils/http';

export const GET_ALL_SUBJECTS_QUERY_KEY = 'GET_ALL_SUBJECTS_QUERY_KEY';
export const GET_SUBJECTS_STALE_TIME = 30 * 1000; // 30 seconds
export const GET_SUBJECTS_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export const getAllSubjects = () => {
  return http.get<Subject[]>(`/catalogs/subjects`);
};
