import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryTemplate from '@templates/CategoryTemplate/CategoryTemplate';
import api from '@services/api';
import usePaginatedEvents from '@hooks/usePaginatedEvents';

const EVENTS_PER_PAGE = 24;

const CategoryPage = () => {
  const { categoryId, categoryName: categoryNameParam } = useParams();
  const [categoryName, setCategoryName] = useState('');
  
  const {
    events,
    loading,
    error,
    page,
    totalPages,
    handlePageChange
  } = usePaginatedEvents(api.getEventsByCategory, categoryId);

  useEffect(() => {
    setCategoryName(categoryNameParam || `Категория №${categoryId}`);
  }, [categoryId, categoryNameParam]);

  return (
    <CategoryTemplate
      title={categoryName}
      events={events}
      loading={{ initial: loading }}
      error={error}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default CategoryPage;