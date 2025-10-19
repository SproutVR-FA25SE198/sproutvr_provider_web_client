import { GET_PROFILE_QUERY_KEY, GET_PROFILE_STALE_TIME, getProfile } from '../services/account.service';

import { useQuery } from '@tanstack/react-query';

const useGetProfile = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_PROFILE_QUERY_KEY],
    queryFn: () => getProfile(),
    refetchOnWindowFocus: false,
    staleTime: GET_PROFILE_STALE_TIME,
  });

  return { data, isLoading, isError };
};

export default useGetProfile;
