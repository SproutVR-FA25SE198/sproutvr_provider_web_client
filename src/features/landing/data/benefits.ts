import { Award, DollarSign, Heart, type LucideIcon, TrendingUp } from 'lucide-react';

export interface Benefit {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
  color: string;
}

export interface Testimonial {
  quote: string;
  description: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

export interface ClientBenefitsData {
  heading: string;
  subheading: string;
  benefits: Benefit[];
  testimonial: Testimonial;
}

export const clientBenefitsData: ClientBenefitsData = {
  heading: 'Hiểu Quả Ấn Tượng',
  subheading: 'Kết quả thực tế từ các trường học đã chuyển mình cùng SproutVR',
  benefits: [
    {
      icon: TrendingUp,
      stat: '85%',
      title: 'Tăng Tương Tác',
      description:
        'Học sinh thể hiện sự tham gia và hứng thú cao hơn rõ rệt khi học với VR so với phương pháp truyền thống.',
      color: 'bg-blue-500',
    },
    {
      icon: Award,
      stat: '40%',
      title: 'Cải Thiện Kết Quả Học Tập',
      description:
        'Các trường sử dụng SproutVR ghi nhận sự tiến bộ đáng kể trong điểm số và khả năng ghi nhớ kiến thức.',
      color: 'bg-violet-500',
    },
    {
      icon: DollarSign,
      stat: '60%',
      title: 'Tiết Kiệm Chi Phí',
      description:
        'Giảm đáng kể chi phí cho thiết bị thực hành, chuyến tham quan, và tài liệu học, đồng thời mang lại trải nghiệm học tập phong phú hơn.',
      color: 'bg-amber-500',
    },
    {
      icon: Heart,
      stat: '95%',
      title: 'Giáo Viên Hài Lòng',
      description:
        'Giáo viên yêu thích cách SproutVR giúp việc giảng dạy trở nên dễ dàng hơn và tạo cầu nối mới với học sinh.',
      color: 'bg-rose-500',
    },
  ],
  testimonial: {
    quote: 'Một Cuộc Cách Mạng Cho Trường Học Của Chúng Tôi',
    description:
      'SproutVR đã hoàn toàn thay đổi cách học sinh của chúng tôi tiếp cận các môn học phức tạp. Sự hứng khởi trong lớp học là điều có thể cảm nhận được, và chúng tôi đang thấy sự cải thiện rõ rệt trong mức độ hiểu bài và ghi nhớ.',
    author: {
      name: 'TS. Nguyễn Thu Hà',
      title: 'Hiệu Trưởng, Trường THPT ABC',
      image: '/professional-school-principal-headshot.jpg',
    },
  },
};
