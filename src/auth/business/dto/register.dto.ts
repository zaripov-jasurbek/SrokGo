import { z } from 'zod';

export const businessRegisterSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  photo: z.string().optional(),
  OpenTime: z.number(),
  CloseTime: z.number().optional(),
  category: z.string().optional(),
  coordination: z.tuple([z.number(), z.number()]),
  region: z.string().optional(),
  password: z.string().min(8),
});

export const businessLoginSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
});

export const businessUpdateMeSchema = businessRegisterSchema.partial();

export type RegisterDto = z.infer<typeof businessRegisterSchema>;
export type LoginDto = z.infer<typeof businessLoginSchema>;
export type UpdateMe = z.infer<typeof businessUpdateMeSchema>;
