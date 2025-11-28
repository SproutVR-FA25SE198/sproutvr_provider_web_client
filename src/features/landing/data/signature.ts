import useGetMaps from '@/common/hooks/useGetMaps';
import { GetAllMapsRequest } from '@/common/services/map.service';
import { mapsWithSubjects } from '@/common/services/mockData';
import { MapWithSubject } from '@/common/types/map.type';

export interface SignatureProductsData {
  heading: string;
  subheading: string;
  maps: MapWithSubject[];
}

export const signatureProductsData = () => {
  const maps =
    useGetMaps({
      pageIndex: 1,
      pageSize: 3,
      Status: 'Active',
    } as GetAllMapsRequest).data?.data || mapsWithSubjects.slice(0, 3);
  return {
    heading: 'Các Bài Học Với Nội Dung VR Đặc Sắc',
    subheading: 'Các mô-đun thực tế ảo được thiết kế tinh xảo mang lại trải nghiệm học tập sống động',
    maps,
  } as SignatureProductsData;
};
