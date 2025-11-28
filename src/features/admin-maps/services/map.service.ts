import http from "@/common/utils/http";

export interface UploadMapRequest {
  MapDataFile: File;
  SubjectId: string;
  Price: number;
}

export const uploadMap = (data: UploadMapRequest) => {
  const formData = new FormData();
  formData.append('MapDataFile', data.MapDataFile);
  formData.append('SubjectId', data.SubjectId);
  formData.append('Price', String(data.Price));

  return http.post<{ mapId: string }>('/catalogs/maps', formData, {
    headers: {
      'Content-Type': undefined,
    },
    timeout: 300000,
  });
};
