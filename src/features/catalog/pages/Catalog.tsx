'use client';

import Loading from '@/common/components/loading';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Checkbox } from '@/common/components/ui/checkbox';
import { Input } from '@/common/components/ui/input';
import { useExternalCheck } from '@/common/hooks/useExternalCheck';
import useGetMaps from '@/common/hooks/useGetMaps';
import { usePaginationNew } from '@/common/hooks/usePagination';
import useScrollTop from '@/common/hooks/useScrollTop';
import { GetAllMapsRequest } from '@/common/services/map.service';
import configs from '@/core/configs';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import MapList from '../components/map-list';
import useGetSubjects from '../hooks/useGetSubjects';

export default function CatalogPage() {
  useScrollTop();

  // ------------------ API Calls ------------------
  const { data: subjectsData, isLoading: isLoadingSubjects } = useGetSubjects();
  const subjects = useMemo(() => {
    if (!subjectsData?.data) return [{ id: 'all', name: 'Tất cả' }];
    return [
      { id: 'all', name: 'Tất cả' },
      ...subjectsData.data.map((subject) => ({ id: subject.id, name: subject.name })),
    ];
  }, [subjectsData]);

  // ------------------ Local UI States ------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('name');

  // Pagination state (for client-side pagination)
  const { pageIndex, setPageIndex } = usePaginationNew(1);
  const itemsPerPage = 3;

  // ------------------ Handlers ------------------
  const handleCategoryToggle = (subjectId: string) => {
    if (subjectId === 'all') {
      setFilterSubject(['all']);
    } else {
      const newSubjects = filterSubject.includes(subjectId)
        ? filterSubject.filter((id) => id !== subjectId)
        : [...filterSubject.filter((id) => id !== 'all'), subjectId];
      setFilterSubject(newSubjects.length === 0 ? ['all'] : newSubjects);
    }
    // Reset to first page when filter changes
    setPageIndex(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    // Reset to first page when sort changes
    setPageIndex(1);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setFilterSubject(['all']);
    setSortBy('name');
    setPageIndex(1);
  };

  // Reset to first page when search changes
  useEffect(() => {
    setPageIndex(1);
  }, [searchQuery, setPageIndex]);

  // ------------------ Build Query Params ------------------
  const queryParams = useMemo(
    () => ({
      SubjectIds: filterSubject.includes('all') ? undefined : filterSubject.length > 0 ? filterSubject : undefined,
      Status: 'Active', // Only show active maps
      pageIndex: 1, // Fetch all data from first page
      pageSize: 1000, // Fetch a large number to get all data for client-side filtering
    }),
    [filterSubject],
  );

  // ------------------ API Call ------------------
  const { data, isLoading, isError } = useGetMaps(queryParams as GetAllMapsRequest);

  // Filter, sort, and paginate on client side
  const processedMaps = useMemo(() => {
    if (!data?.data) return { maps: [], totalCount: 0, totalPages: 0 };

    let result = [...data.data];

    // 1. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (map) => map.name?.toLowerCase().includes(query) || map.description?.toLowerCase().includes(query),
      );
    }

    // 2. Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
    }

    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // 3. Paginate
    const startIndex = (pageIndex - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMaps = result.slice(startIndex, endIndex);

    return { maps: paginatedMaps, totalCount, totalPages };
  }, [data?.data, searchQuery, sortBy, pageIndex]);

  const navigate = useNavigate();
  const isExternal = useExternalCheck();

  useEffect(() => {
    if (isError) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      const timer = setTimeout(() => {
        if (isExternal) navigate(configs.routes.home);
        else navigate(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isExternal, navigate]);

  const hasActiveFilters = searchQuery.trim() !== '' || !filterSubject.includes('all') || sortBy !== 'name';

  if (isLoading || isError || isLoadingSubjects)
    return <Loading isLoading={isLoading || isError || isLoadingSubjects} message={isError ? 'Quay lại...' : ''} />;
  return (
    <div className='pt-6 min-h-screen bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-4'
        >
          <h1 className='text-4xl md:text-4xl font-bold text-primary mb-4 text-balance'>Catalog Học Liệu VR</h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
            Khám phá bộ sưu tập bài học VR tương tác cho mọi môn học
          </p>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Sidebar - Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='lg:w-64 flex-shrink-0'
          >
            <div className='sticky top-24 '>
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Môn học</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  {subjects.map((subject) => (
                    <div key={subject.id} className='flex items-center space-x-2'>
                      <Checkbox
                        id={subject.id}
                        checked={filterSubject.includes(subject.id)}
                        onCheckedChange={() => handleCategoryToggle(subject.id)}
                      />
                      <label
                        htmlFor={subject.id}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 flex items-center justify-between'
                      >
                        <span>{subject.name}</span>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.aside>

          {/* Right Content - Products */}
          <div className='flex-1 mb-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='mb-6 flex flex-col sm:flex-row gap-4'
            >
              <div className='flex-1 relative'>
                <Input
                  type='text'
                  placeholder='Tìm kiếm sản phẩm...'
                  className='pl-5'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant='ghost'
                  className='absolute right-1 top-1/2 -translate-y-1/2 rounded-md hover:bg-transparent hover:text-secondary hover:cursor-pointer'
                >
                  <Search />
                </Button>
              </div>
              <select
                className='px-4 py-2 border border-input rounded-md bg-background text-sm'
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value='name'>Sắp xếp: Tên A-Z</option>
                <option value='price-asc'>Giá: Thấp đến Cao</option>
                <option value='price-desc'>Giá: Cao đến Thấp</option>
              </select>
              {hasActiveFilters && (
                <Button variant='outline' onClick={handleClearAll} className='flex items-center gap-2'>
                  <X className='w-4 h-4' />
                  Xóa bộ lọc
                </Button>
              )}
            </motion.div>

            <MapList
              mapList={processedMaps.maps}
              currentPage={pageIndex}
              setCurrentPage={setPageIndex}
              itemsPerRow={3}
              totalPages={processedMaps.totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
