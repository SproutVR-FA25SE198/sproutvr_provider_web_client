import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card';
import { MapWithSubject } from '@/common/types';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapCardProps {
  map: MapWithSubject;
  index: number;
}

const MapCard = ({ map, index }: MapCardProps) => {
  return (
    <motion.div
      key={map.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col'>
        <Link to={`/catalog/${map.id}`}>
          <div className=' relative aspect-video overflow-hidden'>
            <img
              src={map.imageUrl || '/placeholder.svg'}
              alt={map.name}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
            <Badge variant='outline' className='absolute bg-white shadow-sm top-4 right-4'>
              <span>{map.subject.masterSubject.name}</span>
            </Badge>
          </div>
        </Link>
        <CardHeader className='flex-1'>
          <div className='flex items-start justify-between gap-2 mb-2'>
            <CardTitle className='text-xl'>
              <Link to={`/catalog/${map.id}`} className='hover:text-secondary transition-colors'>
                {map.name}
              </Link>
            </CardTitle>
          </div>
          <CardDescription>{map.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between mb-3'>
            <Badge variant='default'>{map.subject.name}</Badge>
            <span className='text-lg font-bold text-secondary'>{map.price.toLocaleString('vi-VN')} VND</span>
          </div>
        </CardContent>
        <CardFooter className='gap-2'>
          <Button className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground' asChild>
            <Link to={`/catalog/${map.id}`}>Xem Chi Tiết</Link>
          </Button>
          <Button variant='outline' size='icon'>
            <ShoppingCart className='w-4 h-4' />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MapCard;
