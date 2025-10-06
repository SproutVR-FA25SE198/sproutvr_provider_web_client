import { mapsWithSubjects } from '@/common/services/mockData';
import { MapWithSubject } from '@/common/types/map.type';

export interface SignatureProductsData {
  heading: string;
  subheading: string;
  maps: MapWithSubject[];
}

export const signatureProductsData: SignatureProductsData = {
  heading: 'Các Bài Học Với Nội Dung VR Đặc Sắc',
  subheading: 'Các mô-đun thực tế ảo được thiết kế tinh xảo mang lại trải nghiệm học tập sống động',
  maps: mapsWithSubjects.slice(0, 3),
};
