import { useMemo, useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number = 3) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentData,
    setPage,
    nextPage,
    prevPage,
  };
}

// import { useState, useCallback } from 'react';

// export function usePagination(initialPage = 1) {
//   const [pageIndex, setPageIndex] = useState(initialPage);

//   const nextPage = useCallback(() => setPageIndex((p) => p + 1), []);
//   const prevPage = useCallback(() => setPageIndex((p) => Math.max(1, p - 1)), []);
//   const goToPage = useCallback((p: number) => setPageIndex(p), []);

//   return { pageIndex, nextPage, prevPage, goToPage, setPageIndex };
// }
