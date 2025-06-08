import { useEffect, useState } from 'react';

const usePaginatedEvents = (fetchFunction, id, itemsPerPage = 24) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (page - 1) * itemsPerPage;
        const { items, total } = await fetchFunction(id, itemsPerPage, offset);

        setEvents(items);
        setTotalPages(Math.ceil(total / itemsPerPage) || 1);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить события');
        setEvents([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
    }
  };

  return {
    events,
    loading,
    error,
    page,
    totalPages,
    handlePageChange,
  };
};

export default usePaginatedEvents;
