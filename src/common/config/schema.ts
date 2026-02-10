import { z } from 'zod';

export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
}

export const envSchema = z
  .object({
    MONGO_URI: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRE: z.string(),
    JWT_SECRET_REFRESH_TOKEN: z.string(),
    JWT_EXPIRE_REFRESH_TOKEN: z.string(),
    HOST: z.string(),
    PORT: z.string().transform(Number),
    PASSWORD_SALT: z.string(),
    NODE_ENV: z.enum([NodeEnvironment.Development, NodeEnvironment.Production]),
  })
  .required();

export type TConfig = z.infer<typeof envSchema>;
