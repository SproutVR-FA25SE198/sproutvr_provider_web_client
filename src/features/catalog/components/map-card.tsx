import images from '@/assets/imgs';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/common/components/ui/card';
import useBaskets from '@/common/hooks/useBasket';
import { MapWithSubject } from '@/common/types';
import { truncateText } from '@/common/utils/truncateText';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapCardProps {
  map: MapWithSubject;
  index: number;
  isPurchased?: boolean;
}

const MapCard = ({ map, index, isPurchased = false }: MapCardProps) => {
  const { basket, addItem } = useBaskets();

  const isInBasket = basket?.basketItems?.some((item) => item.mapId === map.id) || false;

  const addToBasket = () => {
    if (isPurchased) return; // Prevent adding purchased maps to cart
    addItem({
      mapId: map.id,
      mapName: map.name,
      mapCode: map.mapCode,
      imageUrl: map.imageUrl,
      subjectName: map.subject.name,
      price: map.price,
    });
  };
  return (
    <motion.div
      key={map.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className='overflow-hidden hover:shadow-lg transition-shadow md:h-100 flex flex-col'>
        <Link to={`/catalog/${map.id}`}>
          <div className=' relative aspect-video overflow-hidden'>
            <img
              src={map.imageUrl || images.empty}
              alt={map.name}
              className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            />
            <Badge variant='outline' className='absolute bg-white shadow-sm top-4 right-4'>
              <span>{map.subject.masterSubject.name}</span>
            </Badge>
            {isPurchased && (
              <Badge variant='default' className='absolute bg-green-600 hover:bg-green-700 text-white shadow-sm top-4 left-4'>
                <span>Đã mua</span>
              </Badge>
            )}
          </div>
        </Link>
        <CardHeader className='flex-1 -mb-5 h-25 py-4'>
          <div className='flex items-start justify-between gap-2 mb-2'>
            <CardTitle className='text-xl'>
              <Link to={`/catalog/${map.id}`} className='hover:text-secondary transition-colors'>
                {truncateText(map.name, 22)}
              </Link>
            </CardTitle>
          </div>
          <CardDescription>{truncateText(map.description, 65)}</CardDescription>
        </CardHeader>
        <CardContent className='py-0 flex-1'>
          <div className='flex items-center h-15 justify-between'>
            <Badge variant='default' className='px-2 md:max-w-20'>
              {map.subject.name}
            </Badge>
            <span className='text-lg font-bold text-secondary'>{map.price.toLocaleString('vi-VN')} VND</span>
          </div>
        </CardContent>
        <CardFooter className='gap-2 pt-0'>
          <Button className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground' asChild>
            <Link to={`/catalog/${map.id}`}>Xem Chi Tiết</Link>
          </Button>
          {!isPurchased && !isInBasket && (
            <Button variant='outline' size='icon' onClick={addToBasket}>
              <ShoppingCart className='w-4 h-4' />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MapCard;
