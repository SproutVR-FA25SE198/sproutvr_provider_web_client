import { Button } from '@/common/components/ui/button';
import { BasketItem } from '@/common/types/basket.type';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface MapBasketCardProps {
  item: BasketItem;
  index: number;
  removeItem: (id: string) => void;
}

const MapBasketCard: React.FC<MapBasketCardProps> = ({ item, index, removeItem }) => {
  return (
    <motion.div
      key={item.mapId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className='flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow'
    >
      <Link to={`/catalog/${item.mapId}`} className='flex-shrink-0'>
        <img
          src={item.imageUrl || '/placeholder.svg'}
          alt={item.mapName}
          className='w-24 h-24 object-cover rounded-md'
        />
      </Link>
      <div className='flex-1 min-w-0'>
        <h3 className='font-semibold text-lg mb-1'>
          <Link to={`/catalog/${item.mapId}`} className='hover:text-secondary transition-colors'>
            {item.mapName}
          </Link>
        </h3>
        <p className='text-sm text-muted-foreground mb-2'>
          {item.mapName} • {item.mapName}
        </p>
        <p className='text-lg font-bold text-secondary'>{item.price.toLocaleString('vi-VN')} VND</p>
      </div>
      <div className='flex flex-col items-end my-auto justify-between'>
        <Button
          variant='ghost'
          size='icon'
          className='text-foreground/40 hover:text-destructive'
          onClick={() => removeItem(item.mapId)}
        >
          <Trash2 className='w-12 h-12' />
        </Button>
      </div>
    </motion.div>
  );
};

export default MapBasketCard;
