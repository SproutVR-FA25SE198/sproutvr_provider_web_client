import { BookOpen, Gauge, type LucideIcon, Users, Zap } from 'lucide-react';

export interface ProvisionCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ProvisionData = {
  heading: 'Tất Cả Những Gì Trường Học Cần',
  subheading: 'Hệ sinh thái giáo dục thực tế ảo toàn diện, được thiết kế riêng cho các trường phổ thông',
  provisions: [
    {
      icon: BookOpen,
      title: 'Nội Dung Theo Chương Trình Học',
      description:
        'Hơn 200+ bài học VR bám sát chuẩn chương trình giáo dục quốc gia, bao phủ các lĩnh vực STEM, lịch sử, nghệ thuật và nhiều hơn nữa.',
    },
    {
      icon: Users,
      title: 'Sử Dụng Dễ Dàng',
      description:
        'Cung cấp hướng dẫn khởi đầu chi tiết, chương trình bồi dưỡng thường xuyên và hỗ trợ kỹ thuật 24/7 cho giáo viên.',
    },
    {
      icon: Zap,
      title: 'Tích Hợp Dễ Dàng',
      description:
        'Kết nối mượt mà với hệ thống quản lý học tập (LMS) và công nghệ sẵn có trong lớp học — không cần chuyên môn kỹ thuật.',
    },
    {
      icon: Gauge,
      title: 'Hiệu Suất Mượt Mà',
      description:
        'Tối ưu cho các thiết bị phổ biến tại trường học, đảm bảo trải nghiệm VR ổn định, mượt mà và không bị gián đoạn trong suốt buổi học.',
    },
  ] as ProvisionCard[],
};
