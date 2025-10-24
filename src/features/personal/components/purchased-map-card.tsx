import { Badge } from '@/common/components/ui/badge';
import { Card, CardContent, CardDescription } from '@/common/components/ui/card';
import { MapWithSubject } from '@/common/types';
import { BasketItem } from '@/common/types/basket.type';
import { truncateText } from '@/common/utils/truncateText';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PurchasedMapCardProps {
  map: BasketItem;
  index: number;
}

const PurchasedMapCard = ({ map, index }: PurchasedMapCardProps) => {
  console.log('Purchased map:', map);
  return (
    <motion.div
      key={map.mapId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow h-60 md:w-65 w-75'>
        <Link to={`/catalog/${map.mapId}`}>
          <div className='aspect-video overflow-hidden'>
            <img
              src={map.imageUrl || '/placeholder.svg'}
              alt={map.mapName}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
          </div>
        </Link>
        <CardContent className='pt-4 pb-4'>
          <h3 className='font-semibold mb-2'>
            <Link to={`/catalog/${map.mapId}`} className='hover:text-secondary transition-colors'>
              {truncateText(map.mapName, 25)}
            </Link>
          </h3>
          <div className='flex items-center justify-between'>
            <Badge variant='secondary'>{map.subjectName}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PurchasedMapCard;
