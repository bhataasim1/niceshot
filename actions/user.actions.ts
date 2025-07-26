'use server';

import { getUser } from '@/lib/auth-utils';

export const getUserAction = async () => {
  const user = await getUser();
  return user;
};
