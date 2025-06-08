import { useState, useEffect } from 'react';
import api from '@services/api';

const useFilteredCategories = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const categories = await api.getAllCategories();

        const categoryEvents = await Promise.all(
          categories.map(async (category) => {
            const response = await api.getEventsByCategory(category.id);
            return { category, events: response.items };
          })
        );

        const filtered = categoryEvents
          .filter(({ events }) => events && events.length > 0)
          .map(({ category }) => category);

        setFilteredCategories(filtered);
      } catch (err) {
        console.error('Ошибка при загрузке категорий с мероприятиями:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredCategories();
  }, []);

  return { filteredCategories, loading, error };
};

export default useFilteredCategories;