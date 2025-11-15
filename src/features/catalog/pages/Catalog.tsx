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
import { Search } from 'lucide-react';
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
    return [{ id: 'all', name: 'Tất cả' }, ...subjectsData.data.map((subject) => ({ id: subject.id, name: subject.name }))];
  }, [subjectsData]);

  // ------------------ Local UI States ------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('name');

  // Pagination state (for backend)
  const { pageIndex, setPageIndex } = usePaginationNew(1);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
      setPageIndex(1); // Reset to first page when search changes
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, setPageIndex]);

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

  const handleSearchSubmit = () => {
    // Trigger search immediately on button click or Enter key
    setDebouncedSearchQuery(searchQuery.trim());
    setPageIndex(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    // Reset to first page when sort changes
    setPageIndex(1);
  };

  // ------------------ Build Query Params ------------------
  // Map SortBy values to backend format if needed
  const mapSortBy = (sort: string): string | undefined => {
    switch (sort) {
      case 'name':
        return 'Name'; // Sort by name A-Z
      case 'price-asc':
        return 'Price ASC'; // Sort by price low to high
      case 'price-desc':
        return 'Price DESC'; // Sort by price high to low
      default:
        return sort || undefined;
    }
  };

  const queryParams = useMemo(
    () => ({
      Name: debouncedSearchQuery || undefined,
      SubjectIds: filterSubject.includes('all') ? undefined : filterSubject.length > 0 ? filterSubject : undefined,
      SortBy: mapSortBy(sortBy),
      Status: 'Active', // Only show active maps
      pageIndex,
      pageSize: 3,
    }),
    [debouncedSearchQuery, filterSubject, sortBy, pageIndex],
  );

  // ------------------ API Call ------------------
  const { data, isLoading, isError } = useGetMaps(queryParams as GetAllMapsRequest);
  const maps = data?.data ?? []; // Use API data only
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / (data?.pageSize ?? 3));
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

  if (isLoading || isError || isLoadingSubjects) return <Loading isLoading={isLoading || isError || isLoadingSubjects} message={isError ? 'Quay lại...' : ''} />;
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
          <h1 className='text-4xl md:text-4xl font-bold text-primary mb-4 text-balance'>Catalog Sản Phẩm VR</h1>
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
                  <CardTitle className='text-lg'>Danh mục</CardTitle>
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
                        {/* <span className='text-muted-foreground'>({subject.count})</span> */}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                />
                <Button
                  variant='ghost'
                  className='absolute right-1 top-1/2 -translate-y-1/2 rounded-md hover:bg-transparent hover:text-secondary hover:cursor-pointer'
                  onClick={handleSearchSubmit}
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
            </motion.div>

            <MapList
              mapList={maps}
              currentPage={pageIndex}
              setCurrentPage={setPageIndex}
              itemsPerRow={3}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
