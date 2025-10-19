export enum Role {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  USER = 'ORGANIZATION',
}

export enum ActivityType {
  QUIZ = 'QUIZ',
  ACTION = 'ACTION',
}

export enum OrderStatus {
  Pending_Payment = 'Chờ thanh toán',
  Payment_Failed = 'Thanh toán thất bại',
  Pending_Bundle = 'Đã tiếp nhận',
  Assigned = 'Đang xử lý',
  Finished = 'Đã hoàn thành',
  Canceled = 'Đã hủy',
}
