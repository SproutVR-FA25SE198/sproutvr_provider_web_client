import { z } from 'zod';

export const checkoutSchema = z.object({
  organizationName: z.string(),
  representativeName: z.string().min(1, 'Tên người đại diện là bắt buộc'),
  representativePhone: z.string().regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
  email: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  paymentMethod: z.string().min(1, 'Vui lòng chọn phương thức thanh toán'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
