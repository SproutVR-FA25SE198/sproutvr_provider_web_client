import configs from '@/core/configs';

import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapBreadcrumbProps {
  masterSubject: string;
  subject: string;
  mapName: string;
}

const MapBreadcrumb = ({ masterSubject, subject, mapName }: MapBreadcrumbProps) => {
  return (
    <nav className='flex items-center flex-wrap gap-1.5 text-sm py-3'>
      <Link
        to={configs.routes.catalog}
        className='flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors'
      >
        <Home className='w-4 h-4' />
        <span>Catalog</span>
      </Link>

      <ChevronRight className='w-4 h-4 text-muted-foreground/50' />

      <span className='px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground text-xs font-medium'>
        {masterSubject}
      </span>

      <ChevronRight className='w-4 h-4 text-muted-foreground/50' />

      <span className='px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground text-xs font-medium'>{subject}</span>

      <ChevronRight className='w-4 h-4 text-muted-foreground/50' />

      <span className='text-foreground font-medium truncate max-w-[200px] md:max-w-[300px]' title={mapName}>
        {mapName}
      </span>
    </nav>
  );
};

export default MapBreadcrumb;
