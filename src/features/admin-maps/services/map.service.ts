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

/**
 * Get map metadata and upload to Drive
 */
export const getMapMetadata = (mapId: string) => {
  return http.get(`/catalogs/maps/metadata/${mapId}`);
};

export interface UpdateMapRequest {
  price?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  subjectId?: string;
  status?: string;
  mapCode?: string;
}

/**
 * Update map information
 */
export const updateMap = (mapId: string, data: UpdateMapRequest) => {
  return http.put(`/catalogs/maps/${mapId}`, data);
};
