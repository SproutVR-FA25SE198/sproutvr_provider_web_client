import Loading from '@/common/components/loading';
import useBaskets from '@/common/hooks/useBasket';
import { useExternalCheck } from '@/common/hooks/useExternalCheck';
import useGetMaps from '@/common/hooks/useGetMaps';
import useScrollTop from '@/common/hooks/useScrollTop';
import { GetAllMapsRequest } from '@/common/services/map.service';
import configs from '@/core/configs';

import { useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import MapBreadcrumb from '../components/map-breadcrumb';
import { MapExplore } from '../components/map-explore';
import { MapInfo } from '../components/map-info';
import { MapResources } from '../components/map-resources';
import { MediaGallery } from '../components/media-gallery';
import useGetMapDetails from '../hooks/useGetMapDetails';

export default function MapDetails() {
  useScrollTop();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isExternal = useExternalCheck();

  const { basketItems, addItem } = useBaskets();
  const isInBasket = basketItems.some((item) => item.mapId === id);

  const { data: map, isLoading, isError } = useGetMapDetails({ mapId: id as string });

  // Get related maps from the same subject, excluding current map
  const relatedMapsParams = useMemo<GetAllMapsRequest>(
    () => ({
      pageIndex: 1,
      pageSize: 4,
      SubjectIds: map?.subject?.id ? [map.subject.id] : undefined,
      Status: 'active', // Only show active maps
    }),
    [map?.subject?.id],
  );

  const { data: relatedMapsData } = useGetMaps(relatedMapsParams);
  const relatedMaps = useMemo(() => {
    if (!relatedMapsData?.data) return [];
    // Filter out current map and limit to 4
    return relatedMapsData.data.filter((m) => m.id !== id).slice(0, 4);
  }, [relatedMapsData, id]);

  useEffect(() => {
    if (isError) {
      toast.error('Có lỗi xảy ra. Chúng tôi sẽ đưa bạn quay về.');
      const timer = setTimeout(() => {
        if (isExternal) navigate(configs.routes.home);
        else navigate(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isExternal, navigate]);

  if (isLoading || isError || !map) {
    return <Loading isLoading={isLoading || isError || !map} message={isError ? 'Quay lại...' : ''} />;
  }

  // Ensure map and nested properties exist before rendering
  if (!map || !map.subject || !map.subject.masterSubject) {
    return <Loading isLoading message='Đang tải...' />;
  }

  return (
    <>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <MapBreadcrumb
          masterSubject={map.subject.masterSubject.name}
          subject={map.subject.name}
          mapName={map.name}
        />

        <div className='grid lg:grid-cols-2 gap-12 mt-4 mb-12'>
          <MediaGallery images={new Array(4).fill(map.imageUrl)} />
          <MapInfo map={map} inBasket={isInBasket} updateBasket={addItem} />
        </div>

        <MapResources mapMetadata={map} />
        <hr className='my-0 border-border' />
        {relatedMaps.length > 0 && (
          <MapExplore masterSubject={map.subject.masterSubject.name} maps={relatedMaps} />
        )}
      </div>
    </>
  );
}
