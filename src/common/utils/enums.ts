export enum Role {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  USER = 'ORGANIZATION',
}

export enum ActivityType {
  QUIZ = 'Trắc nghiệm',
  INFO = 'Đọc thông tin',
  INTERACTIVE = 'Tương tác',
  GRAB = 'Cầm nắm vật thể',
}

export enum OrderStatus {
  Payment_Pending = 'Chờ thanh toán',
  Payment_Failed = 'Thanh toán thất bại',
  Bundle_Pending = 'Đã tiếp nhận',
  Assigned = 'Đang xử lý',
  Finished = 'Đã hoàn thành',
  Canceled = 'Đã hủy',
}
