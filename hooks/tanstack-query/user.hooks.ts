import {
  getCurrentUserWithPurchase,
  getUserAction,
} from '@/actions/user.actions';
import { QUERY_KEYS } from '@/lib/query-keys';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUserAction,
  });
};

export const useCurrentUserWithPurchase = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER_WITH_PURCHASE],
    queryFn: getCurrentUserWithPurchase,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes cache retention
    refetchOnWindowFocus: false, // Don't refetch on focus
    retry: 2, // Retry failed requests twice
  });
};
