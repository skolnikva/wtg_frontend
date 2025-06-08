import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchTemplate from '@templates/SearchTemplate/SearchTemplate';
import api from '@services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await api.searchEvents(searchQuery);
      setResults(response);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, performSearch]);

  const handleReset = () => {
    setQuery('');
    setResults([]);
  };

  const handleSearchButtonClick = () => {
    performSearch(query);
  };

  return (
    <SearchTemplate
      query={query}
      onChange={e => setQuery(e.target.value)}
      onSearch={handleSearchButtonClick}
      onReset={handleReset}
      onClose={handleClose}
      results={results}
      loading={loading}
    />
  );
};

export default SearchPage;
