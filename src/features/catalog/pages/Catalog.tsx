'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Checkbox } from '@/common/components/ui/checkbox';
import { Input } from '@/common/components/ui/input';
import useScrollTop from '@/common/hooks/useScrollTop';
import { mapsWithSubjects as maps, subjectsWithMasters as defaultSubject } from '@/common/services/mockData';
import { normalizeText } from '@/common/utils/normalizeText';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

import MapList from '../components/map-list';

const subjects = [{ id: 'all', name: 'Tất cả' }, ...defaultSubject];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useScrollTop();

  const handleCategoryToggle = (subjectId: string) => {
    if (subjectId === 'all') {
      setFilterSubject(['all']);
    } else {
      const newSubjects = filterSubject.includes(subjectId)
        ? filterSubject.filter((id) => id !== subjectId)
        : [...filterSubject.filter((id) => id !== 'all'), subjectId];

      setFilterSubject(newSubjects.length === 0 ? ['all'] : newSubjects);
    }
    setCurrentPage(1);
  };

  let filteredProducts = maps.filter((map) => {
    const normalizedQuery = normalizeText(searchQuery.toLowerCase());
    const matchesSearch =
      normalizeText(map.name.toLowerCase()).includes(normalizedQuery) ||
      normalizeText(map.description.toLowerCase()).includes(normalizedQuery) ||
      normalizeText(map.subject.name.toLowerCase()).includes(normalizedQuery);

    const matchesCategory = filterSubject.includes('all') || filterSubject.includes(map.subject.id);

    return matchesSearch && matchesCategory;
  });

  // Sort maps
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='min-h-screen bg-background'>
      <main className='pt-22 pb-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center mb-8'
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
              <div className='sticky top-24'>
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
            <div className='flex-1'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='mb-6 flex flex-col sm:flex-row gap-4'
              >
                <div className='flex-1 relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                  <Input
                    type='text'
                    placeholder='Tìm kiếm sản phẩm...'
                    className='pl-10'
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <select
                  className='px-4 py-2 border border-input rounded-md bg-background text-sm'
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value='name'>Sắp xếp: Tên A-Z</option>
                  <option value='price-low'>Giá: Thấp đến Cao</option>
                  <option value='price-high'>Giá: Cao đến Thấp</option>
                </select>
              </motion.div>

              <MapList
                mapList={displayedProducts}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
