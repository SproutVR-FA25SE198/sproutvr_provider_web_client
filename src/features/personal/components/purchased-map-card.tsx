import { Badge } from '@/common/components/ui/badge';
import { Card, CardContent, CardDescription } from '@/common/components/ui/card';
import { MapWithSubject } from '@/common/types';
import { truncateText } from '@/common/utils/truncateText';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PurchasedMapCardProps {
  map: MapWithSubject;
  index: number;
}

const PurchasedMapCard = ({ map, index }: PurchasedMapCardProps) => {
  return (
    <motion.div
      key={map.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow h-80 md:w-65 w-75'>
        <Link to={`/catalog/${map.id}`}>
          <div className='aspect-video overflow-hidden'>
            <img
              src={map.imageUrl || '/placeholder.svg'}
              alt={map.name}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>
        </Link>
        <CardContent className='pt-4 pb-4'>
          <h3 className='font-semibold mb-2'>
            <Link to={`/catalog/${map.id}`} className='hover:text-secondary transition-colors'>
              {truncateText(map.name, 25)}
            </Link>
          </h3>
          <CardDescription className='mb-2 h-16 overflow-auto'>{map.description}</CardDescription>
          <div className='flex items-center justify-between'>
            <Badge variant='secondary'>{map.subject.name}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PurchasedMapCard;
