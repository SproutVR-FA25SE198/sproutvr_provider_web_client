'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/common/components/ui/dialog';
import { GetMapByIdResponse, MapDetails } from '@/common/types';
import { ActivityType, cn } from '@/common/utils';

import { BookOpen, Box, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface MapResourcesProps {
  mapMetadata: GetMapByIdResponse | MapDetails;
}

export function MapResources({ mapMetadata }: MapResourcesProps) {
  const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const objectsPerPage = 4;
  const locationsPerPage = 4;
  const totalObjectPages = Math.ceil(mapMetadata.mapObjects.length / objectsPerPage);
  const totalLocationPages = Math.ceil(mapMetadata.taskLocations.length / locationsPerPage);
  const totalObjects = mapMetadata.mapObjects.length;
  const totalLocations = mapMetadata.taskLocations.length;

  const visibleObjects = mapMetadata.mapObjects.slice(currentObjectIndex, currentObjectIndex + objectsPerPage);
  const visibleLocations = mapMetadata.taskLocations.slice(
    currentLocationIndex,
    currentLocationIndex + locationsPerPage,
  );

  const handleObjectPrevious = () => {
    setCurrentObjectIndex((prev) => Math.max(0, prev - objectsPerPage));
  };

  const handleObjectNext = () => {
    setCurrentObjectIndex((prev) => Math.min(mapMetadata.mapObjects.length - objectsPerPage, prev + objectsPerPage));
  };

  const handleLocationPrevious = () => {
    setCurrentLocationIndex((prev) => Math.max(0, prev - locationsPerPage));
  };

  const handleLocationNext = () => {
    setCurrentLocationIndex((prev) =>
      Math.min(mapMetadata.taskLocations.length - locationsPerPage, prev + locationsPerPage),
    );
  };

  return (
    <div className='border-t border-border pt-8 mb-16'>
      <h2 className='text-2xl font-bold text-foreground mb-8'>Tài nguyên</h2>

      {/* Task Locations Carousel */}
      <div className='mb-12'>
        <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-primary' />
          Vị trí nhiệm vụ
          <span className='text-muted-foreground'>({totalLocations})</span>
        </h3>
        <div className='relative'>
          {/* Navigation Buttons */}
          {totalLocations > locationsPerPage && (
            <>
              <button
                onClick={handleLocationPrevious}
                disabled={currentLocationIndex === 0}
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
                  'w-10 h-10 rounded-full bg-background border-2 border-border',
                  'flex items-center justify-center transition-all duration-200',
                  'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
                  'shadow-lg',
                )}
              >
                <ChevronLeft className='w-5 h-5' />
              </button>

              <button
                onClick={handleLocationNext}
                disabled={currentLocationIndex >= totalLocations - locationsPerPage}
                className={cn(
                  'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
                  'w-10 h-10 rounded-full bg-background border-2 border-border',
                  'flex items-center justify-center transition-all duration-200',
                  'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
                  'shadow-lg',
                )}
              >
                <ChevronRight className='w-5 h-5' />
              </button>
            </>
          )}

          {/* Locations Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 px-2'>
            {visibleLocations.map((location) => (
              <Dialog key={location.id}>
                <DialogTrigger asChild>
                  <div className='group cursor-pointer'>
                    <div className='relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-border mb-3 shadow-sm hover:shadow-lg transition-all duration-300'>
                      <img
                        src={location.imageUrl}
                        alt={location.name}
                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <ZoomIn className='w-8 h-8 text-white drop-shadow-lg' />
                      </div>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm font-semibold text-foreground line-clamp-2 mb-1'>{location.name}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-4xl'>
                  <div className='space-y-4'>
                    <div className='relative aspect-video w-full bg-accent rounded-lg overflow-hidden'>
                      <img src={location.imageUrl} alt={location.name} className='w-full h-full object-contain' />
                    </div>
                    <div className='text-center space-y-2'>
                      <h3 className='text-2xl font-bold text-foreground'>{location.name}</h3>

                      {location.description && <p className='text-muted-foreground mt-4'>{location.description}</p>}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Page Indicator */}
          {totalLocationPages > 1 && (
            <div className='flex justify-center gap-2 mt-6'>
              {Array.from({ length: totalLocationPages }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    Math.floor(currentLocationIndex / locationsPerPage) === index ? 'bg-primary w-6' : 'bg-border',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Types */}
      <div className='mb-12'>
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
      </div>

      {/* Map Objects Carousel */}
      <div>
        <h3 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
          <Box className='w-5 h-5 text-secondary' />
          Vật thể
          <span className='text-muted-foreground'>({totalObjects})</span>
        </h3>
        <div className='relative'>
          {/* Navigation Buttons */}
          {totalObjects > objectsPerPage && (
            <>
              <button
                onClick={handleObjectPrevious}
                disabled={currentObjectIndex === 0}
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10',
                  'w-10 h-10 rounded-full bg-background border-2 border-border',
                  'flex items-center justify-center transition-all duration-200',
                  'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
                  'shadow-lg',
                )}
              >
                <ChevronLeft className='w-5 h-5' />
              </button>

              <button
                onClick={handleObjectNext}
                disabled={currentObjectIndex >= totalObjects - objectsPerPage}
                className={cn(
                  'absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10',
                  'w-10 h-10 rounded-full bg-background border-2 border-border',
                  'flex items-center justify-center transition-all duration-200',
                  'hover:bg-accent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed',
                  'shadow-lg',
                )}
              >
                <ChevronRight className='w-5 h-5' />
              </button>
            </>
          )}

          {/* Objects Grid */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 px-2'>
            {visibleObjects.map((object) => (
              <Dialog key={object.id}>
                <DialogTrigger asChild>
                  <div className='group cursor-pointer'>
                    <div className='relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-accent to-accent/50 border-2 border-border mb-3 shadow-sm hover:shadow-lg transition-all duration-300'>
                      <img
                        src={object.imageUrl}
                        alt={object.name}
                        className='w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <ZoomIn className='w-8 h-8 text-white drop-shadow-lg' />
                      </div>
                    </div>
                    <div className='text-center'>
                      <p className='text-sm font-semibold text-foreground line-clamp-2 mb-1'>{object.name}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-4xl'>
                  <div className='space-y-4'>
                    <div className='relative aspect-square w-full bg-accent rounded-lg overflow-hidden'>
                      <img src={object.imageUrl} alt={object.name} className='w-full h-full object-contain p-8' />
                    </div>
                    <div className='text-center space-y-2'>
                      <h3 className='text-2xl font-bold text-foreground'>{object.name}</h3>

                      {object.description && <p className='text-muted-foreground mt-4'>{object.description}</p>}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Page Indicator */}
          {totalObjectPages > 1 && (
            <div className='flex justify-center gap-2 mt-6'>
              {Array.from({ length: totalObjectPages }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    Math.floor(currentObjectIndex / objectsPerPage) === index ? 'bg-secondary w-6' : 'bg-border',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
