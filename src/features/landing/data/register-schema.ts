import { z } from 'zod';

export const registerSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(1, 'Tên tổ chức không được để trống')
    .max(255, 'Tên tổ chức không được vượt quá 255 ký tự'),

  address: z.string().trim().min(1, 'Địa chỉ không được để trống').max(300, 'Địa chỉ không được vượt quá 300 ký tự'),

  phone: z
    .string()
    .trim()
    .regex(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ'),

  email: z
    .string()
    .trim()
    .min(1, 'Email không được để trống')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .email('Email không hợp lệ'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
