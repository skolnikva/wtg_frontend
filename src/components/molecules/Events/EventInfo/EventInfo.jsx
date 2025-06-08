import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './EventInfo.module.scss';

const EventInfo = ({ title, location, date, onTitleClick }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  }).replace(',', ' в');

  const handleLocationClick = (e) => {
    e.stopPropagation();
    navigate(`/locations/${location.name}/${location.id}`);
  };

  return (
    <div className={styles.info}>
      <Typography
        variant="h3"
        className={styles.title}
        onClick={(e) => {
          e.stopPropagation();
          onTitleClick?.();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) {
            e.stopPropagation();
            onTitleClick();
          }
        }}
      >
        {title}
      </Typography>

      <div
        className={styles.locationLink}
        onClick={handleLocationClick}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleLocationClick(e);
        }}
      >
        {location.name}
      </div>

      <Typography variant="h4" color="gray">{formattedDate}</Typography>
    </div>
  );
};

export default EventInfo;
