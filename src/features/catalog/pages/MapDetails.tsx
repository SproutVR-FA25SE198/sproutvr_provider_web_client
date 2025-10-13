import Loading from '@/common/components/loading';
import useScrollTop from '@/common/hooks/useScrollTop';
import { mapsWithSubjects, mockMapMetadata as mapMetadata } from '@/common/services/mockData';
import configs from '@/core/configs';

import { useEffect } from 'react';
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

  const { data: map, isLoading, isError } = useGetMapDetails({ mapId: id as string });

  useEffect(() => {
    if (isError) {
      toast.error('Có lỗi xảy ra. Chúng tôi sẽ đưa bạn về trang danh mục.');
      const timer = setTimeout(() => navigate(configs.routes.catalog), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, navigate]);

  if (isLoading || isError)
    return <Loading isLoading={isLoading || isError} message={isError ? 'Bạn sẽ được đưa về trang catalog...' : ''} />;
  return (
    <>
      <div className='container mx-auto px-4 py-4 max-w-7xl'>
        <MapBreadcrumb masterSubject={map.subject.masterSubject.name} subject={map.subject.name} mapName={map.name} />

        <div className='grid lg:grid-cols-2 gap-12 mt-4 mb-12'>
          <MediaGallery images={new Array(4).fill(map.imageUrl)} />
          <MapInfo map={map} />
        </div>

        <MapResources mapMetadata={mapMetadata} />
        <hr className='my-0 border-border' />
        <MapExplore masterSubject={map.subject.masterSubject.name} maps={mapsWithSubjects} />
      </div>
    </>
  );
}
