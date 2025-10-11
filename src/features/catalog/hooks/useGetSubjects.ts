import { GET_ALL_SUBJECTS_QUERY_KEY, GET_SUBJECTS_STALE_TIME, getAllSubjects } from '../services/subject.service';

import { useQuery } from '@tanstack/react-query';

const useGetSubjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_ALL_SUBJECTS_QUERY_KEY],
    queryFn: () => getAllSubjects(),
    refetchOnWindowFocus: false,
    staleTime: GET_SUBJECTS_STALE_TIME,
  });
  return { data, isLoading, error };
};

export default useGetSubjects;
