import { headers } from 'next/headers';
import { auth } from './auth';
import { User } from '@/prisma/generated/prisma';

export const getUser = async (): Promise<User | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return session.user as User;
};
