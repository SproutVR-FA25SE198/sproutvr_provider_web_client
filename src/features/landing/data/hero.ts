import images from '@/assets/imgs';
import configs from '@/core/configs';

import { ArrowRight, Play } from 'lucide-react';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroButton {
  text: string;
  variant: 'primary' | 'secondary';
  icon: typeof ArrowRight | typeof Play;
  href?: string;
}

export interface HeroData {
  badge: {
    text: string;
  };
  title: {
    main: string;
    highlight: string;
  };
  subtitle: string;
  buttons: HeroButton[];
  stats: HeroStat[];
  image: {
    src: string;
    alt: string;
  };
  floatingCard: {
    icon: string;
    label: string;
    value: string;
  };
}

export const heroData: HeroData = {
  badge: {
    text: 'Đổi mới giáo dục cùng công nghệ VR',
  },
  title: {
    main: 'Trải nghiệm học tập nhập vai dành cho',
    highlight: 'thế hệ tương lai',
  },
  subtitle:
    'SproutVR mang công nghệ thực tế ảo tiên tiến vào lớp học, giúp những khái niệm phức tạp trở nên sống động và mỗi bài học trở thành một hành trình đáng nhớ.',
  buttons: [
    {
      text: 'Đăng kí hợp tác ngay',
      variant: 'primary',
      href: '#register',
      icon: ArrowRight,
    },
    {
      text: 'Xem catalog sản phẩm',
      variant: 'secondary',
      href: `${configs.routes.catalog}`,
      icon: Play,
    },
  ],
  stats: [
    { value: '500+', label: 'Trường học' },
    { value: '50.000+', label: 'Học sinh' },
    { value: '98%', label: 'Mức độ hài lòng' },
  ],
  image: {
    src: `${images.landingHero}`,
    alt: 'Học sinh sử dụng kính VR trong lớp học',
  },
  floatingCard: {
    icon: '🎓',
    label: 'Mức độ tương tác',
    value: '+85%',
  },
};
