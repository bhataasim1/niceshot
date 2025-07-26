import { useQuery } from '@tanstack/react-query';
import { getUserAction } from '@/actions/user.actions';
import { QUERY_KEYS } from '@/lib/query-keys';

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUserAction,
  });
};
