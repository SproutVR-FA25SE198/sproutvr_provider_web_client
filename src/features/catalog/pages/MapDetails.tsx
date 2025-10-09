import useScrollTop from '@/common/hooks/useScrollTop';
import { mapsWithSubjects, mockMapMetadata as mapMetadata } from '@/common/services/mockData';

import MapBreadcrumb from '../components/map-breadcrumb';
import { MapExplore } from '../components/map-explore';
import { MapInfo } from '../components/map-info';
import { MapResources } from '../components/map-resources';
import { MediaGallery } from '../components/media-gallery';

export default function MapDetails() {
  useScrollTop();
  // const { mapId } = useParams<{ mapId: string }>();
  const map = mapsWithSubjects[0];
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
