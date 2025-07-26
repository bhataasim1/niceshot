import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  server: {
    VERCEL_ENV: z.enum(['development', 'production', 'preview']),
    DATABASE_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_SERVER: z.enum(['sandbox', 'production']),
    POLAR_WEBHOOK_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: process.env.VERCEL_ENV !== 'production',
});
