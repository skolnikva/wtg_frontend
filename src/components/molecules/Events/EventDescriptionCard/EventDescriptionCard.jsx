import React from 'react';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './EventDescriptionCard.module.scss';

const EventDescriptionCard = ({ description, source }) => {
  const isSourceLink = source && (source.startsWith('http://') || source.startsWith('https://'));
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Typography variant="h3" weight="thin">О событии</Typography>
      </div>
      <div className={styles.body}>
        <Typography variant="h4" weight="thin">
          {description || 'Нет описания'}
        </Typography>
      </div>
      <div className={styles.footer}>
        <Typography variant="h4" color="gray">
          Источник: {' '}
          {isSourceLink ? (
            <a 
              href={source} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              {source}
            </a>
          ) : (
            source || 'Не указан'
          )}
        </Typography>
      </div>
    </div>
  );
};

export default EventDescriptionCard;
