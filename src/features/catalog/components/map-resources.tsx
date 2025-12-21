'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/common/components/ui/dialog';
import { GetMapByIdResponse, MapDetails } from '@/common/types';
import { ActivityType, cn } from '@/common/utils';

import { BookOpen, Box, MapPin, ZoomIn } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/common/components/ui/carousel';
import { motion } from 'framer-motion';

interface MapResourcesProps {
  mapMetadata: GetMapByIdResponse | MapDetails;
}

export function MapResources({ mapMetadata }: MapResourcesProps) {
  const totalObjects = mapMetadata.mapObjects.length;
  const totalLocations = mapMetadata.taskLocations.length;

  return (
    <div className='pt-8 mb-16'>
      <h2 className='text-2xl font-bold text-foreground mb-8'>Tài nguyên</h2>

      {/* Task Locations Carousel */}
      <motion.div className='mb-12' initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
        <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-primary' />
          Vị trí nhiệm vụ
          <span className='text-muted-foreground'>({totalLocations})</span>
        </h3>
        <div className='relative'>
          <Carousel className='' opts={{ align: 'start' }}>
            <CarouselContent className='flex gap-4 px-8'>
              {mapMetadata.taskLocations.map((location) => (
                <CarouselItem key={location.id} className='basis-1/2 md:basis-1/4'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className='group cursor-pointer'>
                        <div className='relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-border mb-3 shadow-md hover:border-primary/50 transition-all duration-300'>
                          <img
                            src={location.imageUrl}
                            alt={location.name}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                            <div className='w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                              <ZoomIn className='w-7 h-7 text-white' />
                            </div>
                          </div>
                        </div>
                        <div className='text-center'>
                          <p className='text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors'>
                            {location.name}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className='max-w-4xl'>
                      <div className='space-y-3'>
                        <div className='relative aspect-video w-full bg-accent rounded-lg overflow-hidden'>
                          <img
                            src={location.imageUrl}
                            alt={location.name}
                            className='w-full h-full object-contain p-2'
                          />
                        </div>
                        <div className='text-center space-y-1'>
                          <h3 className='text-xl font-bold text-foreground'>{location.name}</h3>
                          {location.description && <p className='text-muted-foreground mt-2'>{location.description}</p>}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-1 top-1/2 -translate-y-1/2 z-10' />
            <CarouselNext className='right-1 top-1/2 -translate-y-1/2 z-10' />
          </Carousel>
        </div>
      </motion.div>

      {/* Activity Types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-12'
      >
        <h3 className='text-lg font-semibold text-foreground mb-4 flex gap-2 items-center'>
          <BookOpen className='w-5 h-5 text-blue-500' />
          Loại hoạt động
        </h3>
        <div className='grid md:grid-cols-4 gap-3'>
          {Object.values(ActivityType).map((type, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl transition-all duration-200',
                  'border-2 hover:shadow-md hover:scale-[1.02]',
                  'bg-blue-50 border-blue-200 hover:border-blue-300 dark:bg-blue-950/30 dark:border-blue-800',
                )}
              >
                <div className={cn('w-3 h-3 rounded-full flex-shrink-0', 'bg-blue-500')} />
                <span className={cn('font-medium text-base', 'text-blue-700 dark:text-blue-300')}>{type}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Map Objects Carousel */}
      <div>
        <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Box className='w-5 h-5 text-secondary' />
          Vật thể
          <span className='text-muted-foreground'>({totalObjects})</span>
        </h3>
        <div className='relative w-full'>
          <Carousel className='' opts={{ align: 'start' }}>
            <CarouselContent className='flex gap-4 px-8'>
              {mapMetadata.mapObjects.map((object) => (
                <CarouselItem key={object.id} className='basis-1/2 md:basis-1/4'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className='group cursor-pointer'>
                        <div className='relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-accent/50 border-2 border-border mb-3 shadow-md hover:border-secondary/50 transition-all duration-300'>
                          <img
                            src={object.imageUrl}
                            alt={object.name}
                            className='w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3'
                          />
                          <div className='absolute rounded-lg inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                            <div className='w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                              <ZoomIn className='w-7 h-7 text-white' />
                            </div>
                          </div>
                        </div>
                        <div className='text-center'>
                          <p className='text-sm font-semibold text-foreground line-clamp-2 group-hover:text-secondary transition-colors'>
                            {object.name}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className='max-w-md p-2'>
                      <div className='space-y-3'>
                        <div className='relative aspect-square w-full bg-accent rounded-lg overflow-hidden'>
                          <img src={object.imageUrl} alt={object.name} className='w-full h-full object-contain p-2' />
                        </div>
                        <div className='text-center space-y-1'>
                          <h3 className='text-xl font-bold text-foreground'>{object.name}</h3>
                          {object.description && <p className='text-muted-foreground mt-2'>{object.description}</p>}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-1 top-1/2 -translate-y-1/2 z-10' />
            <CarouselNext className='right-1 top-1/2 -translate-y-1/2 z-10' />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
