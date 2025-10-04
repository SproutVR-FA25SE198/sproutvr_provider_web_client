export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
  required: boolean;
  rows?: number;
}

export interface NextStepData {
  heading: string;
  subheading: string;
  steps: Step[];
  form: {
    title: string;
    subtitle: string;
    fields: FormField[];
    submitText: string;
    disclaimer: string;
  };
  guide: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const nextStepData: NextStepData = {
  heading: 'Bước Tiếp Theo – Bắt Đầu Ngay Hôm Nay',
  subheading: 'Tham gia cùng hàng trăm trường học đang ứng dụng SproutVR để đổi mới giáo dục!',
  steps: [
    {
      number: '01',
      title: 'Đăng ký tài khoản tổ chức',
      description: 'Điền thông tin cơ bản của trường học để tạo tài khoản chính thức trên hệ thống SproutVR.',
    },
    {
      number: '02',
      title: 'Xác minh & Kích hoạt',
      description: 'Xác minh email và thông tin liên hệ để kích hoạt tài khoản tổ chức của bạn.',
    },
    {
      number: '03',
      title: 'Chọn gói nội dung',
      description:
        'Khám phá thư viện bản đồ học tập VR và chọn gói nội dung phù hợp với chương trình giảng dạy của trường.',
    },
    {
      number: '04',
      title: 'Triển khai tại lớp học',
      description:
        'Bắt đầu mang đến trải nghiệm học tập thực tế ảo cho học sinh cùng sự hỗ trợ trọn gói từ đội ngũ SproutVR.',
    },
  ],
  form: {
    title: 'Đăng Ký Tài Khoản Tổ Chức',
    subtitle: 'Điền biểu mẫu dưới đây để đăng ký và nhận thông tin hướng dẫn qua email trong vòng 24 giờ.',
    fields: [
      {
        id: 'representative',
        label: 'Họ và tên người đại diện',
        type: 'text',
        placeholder: 'Nguyễn Văn A',
        required: true,
      },
      {
        id: 'email',
        label: 'Email trường học',
        type: 'email',
        placeholder: 'lienhe@truongabc.edu.vn',
        required: true,
      },
      {
        id: 'phone',
        label: 'Số điện thoại liên hệ',
        type: 'text',
        placeholder: '0123 456 789',
        required: true,
      },
      {
        id: 'school',
        label: 'Tên trường',
        type: 'text',
        placeholder: 'Trường THPT Nguyễn Trãi',
        required: true,
      },
      {
        id: 'address',
        label: 'Địa chỉ trường học',
        type: 'text',
        placeholder: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
        required: true,
      },
    ],
    submitText: 'Đăng ký tài khoản',
    disclaimer: 'Bằng cách gửi biểu mẫu này, bạn đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật của SproutVR.',
  },
  guide: {
    title: 'Cần Thêm Thông Tin?',
    description: 'Liên hệ ngay với chúng tôi để được hỗ trợ.',
    buttonText: 'Liên hệ hỗ trợ',
  },
};
