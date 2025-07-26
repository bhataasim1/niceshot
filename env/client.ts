import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_POLAR_PRODUCT_PRO_ID: z.string(),
    NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_POLAR_PRODUCT_PRO_ID:
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_ID,
    NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG:
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_PRO_SLUG,
  },
  skipValidation: process.env.VERCEL_ENV !== 'production',
});
