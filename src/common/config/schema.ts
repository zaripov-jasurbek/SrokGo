import { z } from 'zod';

export const envSchema = z
  .object({
    MONGO_URI: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE: z.string(),
    HOST: z.string(),
    PORT: z.string().transform(Number),
  })
  .required();

export type TConfig = z.infer<typeof envSchema>;
