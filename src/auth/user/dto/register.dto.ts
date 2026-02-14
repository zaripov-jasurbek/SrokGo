import { z } from 'zod';

const phoneRegex = /^\+?[1-9]\d{7,14}$/;

export const userRegisterSchema = z.object({
  name: z.string().min(2),
  about: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(phoneRegex).optional(),
  password: z.string().min(8),
});

export const userLoginSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().regex(phoneRegex).optional(),
    password: z.string().min(8),
  })
  .refine((data) => Boolean(data.email || data.phone), {
    message: 'email or phone is required',
  });

export const userUpdateMeSchema = userRegisterSchema.partial();

export type RegisterDto = z.infer<typeof userRegisterSchema>;
export type LoginDto = z.infer<typeof userLoginSchema>;
export type UpdateMe = z.infer<typeof userUpdateMeSchema>;
