import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1, 'Tên tổ chức không được để trống').max(255, 'Tên tổ chức tối đa 255 ký tự'),
  address: z.string().trim().min(1, 'Địa chỉ không được để trống').max(500, 'Địa chỉ tối đa 500 ký tự'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().trim().email('Email không hợp lệ').max(255, 'Email tối đa 255 ký tự'),
});

export const updateOrganizationSchema = z.object({
  name: z.string().trim().max(255, 'Tên tổ chức tối đa 255 ký tự').optional().or(z.literal('')),
  address: z.string().trim().max(500, 'Địa chỉ tối đa 500 ký tự').optional().or(z.literal('')),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^(0[3|5|7|8|9])[0-9]{8}$/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal('')),
  email: z
    .string()
    .trim()
    .email('Email không hợp lệ')
    .max(255, 'Email tối đa 255 ký tự')
    .optional()
    .or(z.literal('')),
  macAddress: z
    .string()
    .trim()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, 'Định dạng MAC Address không hợp lệ')
    .optional()
    .or(z.literal('')),
  bundleGoogleDriveId: z.string().trim().max(255, 'Bundle ID tối đa 255 ký tự').optional().or(z.literal('')),
});

export type CreateOrganizationFormData = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationFormData = z.infer<typeof updateOrganizationSchema>;


