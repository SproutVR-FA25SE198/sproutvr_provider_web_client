import images from '@/assets/imgs';

import { Eye, Laptop, Layers, type LucideIcon, Settings, Sparkles } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface KeyFeaturesData {
  heading: string;
  subheading: string;
  image: {
    src: string;
    alt: string;
  };
  features: Feature[];
}

export const keyFeaturesData: KeyFeaturesData = {
  heading: 'Tính Năng Mạnh Mẽ Cho Lớp Học Hiện Đại',
  subheading:
    'Được phát triển dành riêng cho giáo viên và học sinh, mỗi tính năng đều hướng đến việc nâng cao hiệu quả học tập',
  image: {
    src: `${images.landingFeatures}`,
    alt: 'Các tính năng của nền tảng giáo dục VR',
  },
  features: [
    {
      icon: Sparkles,
      title: 'Môi Trường 3D Tương Tác',
      description:
        'Không gian học tập nhập vai, nơi học sinh có thể trực tiếp thao tác, thực hành và khám phá các khái niệm một cách sinh động.',
    },
    {
      icon: Eye,
      title: 'Học Tập Đa Giác Quan',
      description:
        'Kích thích đồng thời thị giác, thính giác và vận động, giúp học sinh tiếp thu và ghi nhớ kiến thức hiệu quả hơn.',
    },
    {
      icon: Layers,
      title: 'Thiết Kế Bài Giảng Tùy Biến',
      description:
        'Giáo viên có thể dễ dàng tạo và điều chỉnh nội dung bài học VR phù hợp với từng môn học và mục tiêu giảng dạy.',
    },
    {
      icon: Settings,
      title: 'Theo Dõi Trực Tiếp Trong Lớp Học',
      description:
        'Cho phép giáo viên giám sát hoạt động của học sinh trong không gian VR, đảm bảo tính tương tác và kiểm soát lớp học hiệu quả.',
    },
    {
      icon: Laptop,
      title: 'Triển Khai Linh Hoạt',
      description:
        'Tương thích với kính VR độc lập, máy tính để bàn hoặc thiết bị di động, giúp dễ dàng triển khai tại mọi trường học.',
    },
  ],
};
