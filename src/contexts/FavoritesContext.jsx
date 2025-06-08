import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '@services/api';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const userId = Cookies.get('UserId');
        if (!userId) {
          setFavorites([]);
          setLoading(false);
          return;
        }
        const userData = await api.getUserData(userId);
        setFavorites(userData.favorites || []);
      } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  const addToFavorites = async (eventId) => {
    await api.addToFavorites(eventId);
    setFavorites(prev => [...prev, { id: eventId }]);
  };

  const removeFromFavorites = async (eventId) => {
    await api.removeFromFavorites(eventId);
    setFavorites(prev => prev.filter(fav => fav.id !== eventId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
