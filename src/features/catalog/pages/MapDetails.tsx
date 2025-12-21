import Loading from '@/common/components/loading';
import useBaskets from '@/common/hooks/useBasket';
import { useExternalCheck } from '@/common/hooks/useExternalCheck';
import useGetMaps from '@/common/hooks/useGetMaps';
import useScrollTop from '@/common/hooks/useScrollTop';
import { GetAllMapsRequest } from '@/common/services/map.service';
import configs from '@/core/configs';
import useGetLibrary from '@/features/personal/hooks/useGetLibrary';

import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CurvedMediaSlider from '../components/curved-media-slider.tsx';
import MapBreadcrumb from '../components/map-breadcrumb';
import { MapExplore } from '../components/map-explore';
import { MapInfo } from '../components/map-info';
import { MapResources } from '../components/map-resources';
import useGetMapDetails from '../hooks/useGetMapDetails';

export default function MapDetails() {
  useScrollTop();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isExternal = useExternalCheck();

  const { basketItems, addItem } = useBaskets();
  const isInBasket = basketItems.some((item) => item.mapId === id);

  const { data: map, isLoading, isError } = useGetMapDetails({ mapId: id as string });
  const { data: purchasedMapsData } = useGetLibrary();

  // Check if current map is purchased
  const isPurchased = useMemo(() => {
    if (!purchasedMapsData?.data || !id) return false;
    return purchasedMapsData.data.some((map: { mapId: string }) => map.mapId === id);
  }, [purchasedMapsData, id]);

  // Get related maps from the same subject, excluding current map
  const relatedMapsParams = useMemo<GetAllMapsRequest>(
    () => ({
      pageIndex: 1,
      pageSize: 4,
      SubjectIds: map?.subject?.id ? [map.subject.id] : undefined,
    }),
    [map?.subject?.id],
  );

  const { data: relatedMapsData } = useGetMaps(relatedMapsParams);
  const relatedMaps = useMemo(() => {
    if (!relatedMapsData?.data) return [];
    return relatedMapsData.data.filter((m: { id: string | undefined }) => m.id !== id).slice(0, 4);
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

  const images = Array.isArray(map.imageUrl) ? map.imageUrl : [map.imageUrl];

  return (
    <>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <MapBreadcrumb masterSubject={map.subject.masterSubject.name} subject={map.subject.name} mapName={map.name} />
      </div>

      {/* Slider + MapInfo overlay container */}
      <div className='relative'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <CurvedMediaSlider title='' images={images} />
        </div>

        {/* MapInfo overlays at the bottom of the slider */}
        <div className='container mx-auto px-4 max-w-7xl relative z-20 -mt-24 md:-mt-32'>
          <MapInfo map={map} inBasket={isInBasket} isPurchased={isPurchased} updateBasket={addItem} />
        </div>
      </div>

      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <MapResources mapMetadata={map} />
        {relatedMaps.length > 0 && (
          <>
            <hr className='my-0 border-border' />
            <MapExplore
              masterSubject={map.subject.masterSubject.name}
              maps={relatedMaps}
              purchasedMapIds={
                purchasedMapsData?.data
                  ? new Set<string>(purchasedMapsData.data.map((m: { mapId: string }) => m.mapId))
                  : undefined
              }
            />
          </>
        )}
      </div>
    </>
  );
}
