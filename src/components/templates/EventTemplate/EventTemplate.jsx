import React, { useContext } from 'react';
import EventMetaCard from '@molecules/Events/EventMetaCard/EventMetaCard';
import EventDescriptionCard from '@molecules/Events/EventDescriptionCard/EventDescriptionCard';
import LocationBlock from '@molecules/Events/LocationBlock/LocationBlock';
import LikeButton from '@atoms/Buttons/LikeButton/LikeButton';
import Price from '@atoms/Price/Price';
import styles from './EventTemplate.module.scss';
import defaultEventImage from '@/assets/img/event.png';
import { FavoritesContext } from '@contexts/FavoritesContext';
import { useNotification } from '@contexts/NotificationContext';
import api from '@services/api';
import Cookies from 'js-cookie';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';

const EventTemplate = ({ event, loading, error }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { showNotification } = useNotification();

  if (loading) return <DotsLoader />;
  if (error) return <div>{error}</div>;
  if (!event) return <div>Мероприятие не найдено</div>;

  const isFavorite = favorites.some(fav => fav.id === event.id);
  const imageUrl = event.event_image ? api.getFullMediaUrl(event.event_image) : defaultEventImage;

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
    } catch (err) {
      console.error(err);
      showNotification('error', 'Ошибка при обновлении избранного');
    }
  };

  return (
    <>
      <h1 className={styles.title}>{event.title}</h1>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt={event.title || 'Изображение мероприятия'}
            className={styles.image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultEventImage;
            }}
          />
          <LikeButton isActive={isFavorite} onClick={handleLikeClick} />
          <Price price={event.price} />
        </div>
        <div className={styles.details}>
          <EventMetaCard
            category={event.category}
            tags={event.tags}
            date={event.dates}
          />
          <EventDescriptionCard
            title="О событии"
            description={event.description}
            source={event.url}
          />
          <LocationBlock location={event.location} event={event}/>
        </div>
      </div>
    </>
  );
};

export default EventTemplate;
