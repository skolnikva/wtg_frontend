import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@services/api';
import Cookies from 'js-cookie';
import EventsGrid from '@organisms/Events/EventsGrid/EventsGrid';
import useAuthCheck from '@hooks/useAuthCheck';
import Typography from '@atoms/Text/Typography/Typography';
import usePaginatedEvents from '@hooks/usePaginatedEvents';

export default function FavoritesPage() {
  useAuthCheck();
  const navigate = useNavigate();
  const userId = Cookies.get('UserId');

  if (!userId) {
    navigate('-1');
    return null;
  }

  const fetchFavorites = async (id, limit, offset) => {
    const userData = await api.getUserData(id);
    const favorites = userData.favorites || [];

    const paginated = favorites.slice(offset, offset + limit);
    return {
      items: paginated,
      total: favorites.length,
    };
  };

  const {
    events: favorites,
    loading,
    page,
    totalPages,
    handlePageChange,
    error,
  } = usePaginatedEvents(fetchFavorites, userId);

  return (
    <div>
      <Typography variant="h1" style={{ marginBottom: 20 }}>
        Избранные мероприятия
      </Typography>

      <EventsGrid
        events={favorites}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {error && <div>Ошибка: {error}</div>}
    </div>
  );
}
