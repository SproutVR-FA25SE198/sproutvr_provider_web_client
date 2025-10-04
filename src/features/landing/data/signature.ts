import { Map } from '@/common/types/map.type';

export interface FeaturedMap extends Pick<Map, 'name' | 'description' | 'imageUrl'> {
  badge: string;
}

export interface SignatureProductsData {
  heading: string;
  subheading: string;
  maps: FeaturedMap[];
}

export const signatureProductsData: SignatureProductsData = {
  heading: 'Các Bài Học Với Nội Dung VR Đặc Sắc',
  subheading: 'Các mô-đun thực tế ảo được thiết kế tinh xảo mang lại trải nghiệm học tập sống động',
  maps: [
    {
      name: 'VR Science Lab',
      description:
        'Conduct virtual experiments from molecular biology to physics simulations without the cost or safety concerns of physical labs.',
      imageUrl: '/virtual-reality-science-laboratory-with-molecules-.jpg',
      badge: 'Most Popular',
    },
    {
      name: 'History Explorer',
      description:
        'Transport students to ancient civilizations, historical events, and cultural landmarks for immersive history lessons.',
      imageUrl: '/virtual-reality-ancient-civilization-historical-si.jpg',
      badge: 'New',
    },
    {
      name: 'Math Dimensions',
      description:
        'Visualize complex mathematical concepts in 3D space, from geometry to calculus, making abstract ideas concrete.',
      imageUrl: '/virtual-reality-3d-mathematical-shapes-and-geometr.jpg',
      badge: 'Award Winner',
    },
  ],
};
