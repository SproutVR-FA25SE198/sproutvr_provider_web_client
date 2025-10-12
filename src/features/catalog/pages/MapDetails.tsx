import Loading from '@/common/components/loading';
import useScrollTop from '@/common/hooks/useScrollTop';
import { mapsWithSubjects, mockMapMetadata as mapMetadata } from '@/common/services/mockData';

import { useParams } from 'react-router-dom';

import MapBreadcrumb from '../components/map-breadcrumb';
import { MapExplore } from '../components/map-explore';
import { MapInfo } from '../components/map-info';
import { MapResources } from '../components/map-resources';
import { MediaGallery } from '../components/media-gallery';

export default function MapDetails() {
  useScrollTop();
  const { id } = useParams<{ id: string }>();
  console.log('MapDetails mapId:', id);
  const map = mapsWithSubjects[0];
  const isLoading = false;

  // const { map, isLoading, error } = useGetMapDetails({ mapId: '1' });
  // if (map === undefined || isLoading) map = mapsWithSubjects[0];

  if (isLoading) return <Loading isLoading={isLoading} />;
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
