export enum OrderStatus {
  PaymentPending = 'Payment_Pending',
  BundlePending = 'Bundle_Pending',
  Finished = 'Finished',
  Cancelled = 'Cancelled',
  PaymentFailed = 'Payment_Failed',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  Payment_Pending: 'Chờ thanh toán',
  Bundle_Pending: 'Chờ gói cài đặt',
  Finished: 'Hoàn thành',
  Cancelled: 'Đã hủy',
  Payment_Failed: 'Thất bại',
};

export const ORDER_STATUS_STYLES: Record<string, string> = {
  Payment_Pending: 'bg-yellow-100 text-yellow-800',
  Bundle_Pending: 'bg-blue-100 text-blue-800',
  Finished: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  Payment_Failed: 'bg-red-100 text-red-800',
};

