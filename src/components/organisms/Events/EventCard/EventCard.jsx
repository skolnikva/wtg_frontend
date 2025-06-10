import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LikeButton from '@atoms/Buttons/LikeButton/LikeButton';
import EventInfo from '@molecules/Events/EventInfo/EventInfo';
import { useNotification } from '@contexts/NotificationContext';
import { FavoritesContext } from '@contexts/FavoritesContext';
import styles from './EventCard.module.scss';
import api from '@services/api'
import defaultEventImage from '@/assets/img/event.png';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isPastEvent = new Date(event.closest_date) < new Date();
  const isFavorite = favorites.some(fav => fav.id === event.id);

  const handleCardClick = () => {
    navigate(`/event/${event.title}/${event.id}`);
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    const token = Cookies.get('Token');
    if (!token) {
      showNotification('error', 'Необходимо авторизоваться для добавления в избранное');
      return;
    }

    try {
      if (!isFavorite) {
        await addToFavorites(event.id);
        showNotification('success', 'Добавлено в избранное');
      } else {
        await removeFromFavorites(event.id);
        showNotification('success', 'Удалено из избранного');
      }
    } catch (error) {
      console.error(error);
      showNotification('error', 'Ошибка при обновлении избранного');
    }
  };

  const imageUrl = event.event_image ? api.getFullMediaUrl(event.event_image) : defaultEventImage;

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={event.title}
          className={styles.image}
        />
        {isPastEvent && <div className={styles.overlay} />}
        <LikeButton isActive={isFavorite} onClick={handleLikeClick} />
      </div>
      <EventInfo
        title={event.title}
        location={event.location}
        date={event.closest_date}
        onTitleClick={() => navigate(`/event/${event.title}/${event.id}`)}
      />
    </div>
  );
};

export default EventCard;
