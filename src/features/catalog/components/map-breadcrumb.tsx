import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapBreadcrumbProps {
  masterSubject: string;
  subject: string;
  mapName: string;
}

const MapBreadcrumb = ({ masterSubject, subject, mapName }: MapBreadcrumbProps) => {
  return (
    <nav className='flex items-center gap-2 text-sm text-muted-foreground'>
      <Link to='/catalog' className='hover:text-foreground transition-colors'>
        Catalog
      </Link>
      <ChevronRight className='w-4 h-4' />
      <Link
        to={`/catalog/${masterSubject.toLowerCase().replace(/\s+/g, '-')}`}
        className='hover:text-foreground transition-colors'
      >
        {masterSubject}
      </Link>
      <ChevronRight className='w-4 h-4' />
      <Link
        to={`/catalog/${masterSubject.toLowerCase().replace(/\s+/g, '-')}/${subject.toLowerCase().replace(/\s+/g, '-')}`}
        className='hover:text-foreground transition-colors'
      >
        {subject}
      </Link>
      <ChevronRight className='w-4 h-4' />
      <span className='text-foreground'>{mapName}</span>
    </nav>
  );
};

export default MapBreadcrumb;
