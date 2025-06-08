import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SortTemplate from '@templates/SortTemplate/SortTemplate';
import useFilteredCategories from '@hooks/useFilteredCategories';
import api from '@services/api';

const SortPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [dateRange, setDateRange] = useState([]);
  const { filteredCategories, loading: loadingFiltered } = useFilteredCategories();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState({
    categories: false,
    events: false
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const EVENTS_PER_PAGE = 24;
  const SCROLL_AMOUNT = 200;

  const fetchAllByPagination = async (fetchFn, ...fetchArgs) => {
    const limit = 100;
    let offset = 0;
    let allItems = [];
    let total = 0;

    while (true) {
      const { items, total: fetchedTotal } = await fetchFn(...fetchArgs, limit, offset);
      allItems = [...allItems, ...(items || [])];
      total = fetchedTotal;

      if (allItems.length >= total) break;
      offset += limit;
    }

    return allItems;
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
    return () => currentRef?.removeEventListener('scroll', checkScrollPosition);
  }, [categories]);

  useEffect(() => {
    if (!loadingFiltered) {
      setCategories(filteredCategories);
    }
  }, [filteredCategories, loadingFiltered]);

  const handleClose = () => navigate(-1);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  const applyFilters = async () => {
    setLoading(prev => ({ ...prev, events: true }));

    try {
      let eventsData = [];

      if (selectedCategories.length > 0) {
        const requests = selectedCategories.map(categoryId =>
          fetchAllByPagination(api.getEventsByCategory, categoryId)
        );
        const results = await Promise.all(requests);
        eventsData = results.flat();
      } else {
        eventsData = await fetchAllByPagination(api.getAllEvents);
      }
      const uniqueEventsMap = new Map();
      eventsData.forEach(event => uniqueEventsMap.set(event.id, event));
      let uniqueEvents = Array.from(uniqueEventsMap.values());

      if (dateRange.length > 0) {
        const startDate = formatDate(dateRange[0]);
        const endDate = dateRange.length === 1 ? startDate : formatDate(dateRange[dateRange.length - 1]);

        uniqueEvents = uniqueEvents.filter(event => {
          const eventDate = event.date.split('T')[0];
          return eventDate >= startDate && eventDate <= endDate;
        });
      }

      setAllEvents(uniqueEvents);
      setTotalPages(Math.ceil(uniqueEvents.length / EVENTS_PER_PAGE));
      setPage(1);
      setHasMore(uniqueEvents.length > EVENTS_PER_PAGE);
      setEvents(uniqueEvents.slice(0, EVENTS_PER_PAGE));

    } catch (error) {
      console.error('Ошибка загрузки событий:', error);
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };


  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    const start = (newPage - 1) * EVENTS_PER_PAGE;
    const end = start + EVENTS_PER_PAGE;
    setEvents(allEvents.slice(start, end));
  };


  const resetFilters = () => {
    setDateRange([]);
    setSelectedCategories([]);
    setEvents([]);
    setPage(1);
    setTotalPages(1);
  };

  const actionButtons = [
    {
      type: 'button',
      variant: 'black',
      onClick: () => applyFilters(true, 1),
      label: 'Применить',
      disabled: loading.events
    },
    {
      type: 'button',
      variant: 'grey',
      onClick: resetFilters,
      label: 'Сбросить'
    }
  ];

  return (
    <SortTemplate
      onClose={handleClose}
      dateRange={dateRange}
      setDateRange={setDateRange}
      categories={categories}
      selectedCategories={selectedCategories}
      toggleCategory={toggleCategory}
      scrollRef={scrollRef}
      scrollLeft={scrollLeft}
      scrollRight={scrollRight}
      showLeftArrow={showLeftArrow}
      showRightArrow={showRightArrow}
      loading={loading}
      events={events}
      actionButtons={actionButtons}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      hasMore={hasMore}
    />
  );
};

export default SortPage;
