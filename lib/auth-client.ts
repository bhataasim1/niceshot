import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from 'better-auth/client';
import { envClient } from '../env/client';

export const authClient = createAuthClient({
  baseURL: envClient.NEXT_PUBLIC_APP_URL,
  plugins: [polarClient()],
});
