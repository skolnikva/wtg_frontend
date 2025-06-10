import React from 'react';
import Typography from '@atoms/Text/Typography/Typography';
import EventsGrid from '@organisms/Events/EventsGrid/EventsGrid';
import NothingFoundMessage from '@molecules/Events/NothingFoundMessage/NothingFoundMessage';
import styles from './CategoryTemplate.module.scss';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';

const CategoryTemplate = ({ title, events, loading, page, totalPages, onPageChange }) => {
  return (
    <div className={styles.wrapper}>
      <Typography variant="h1" className={styles.title}>
        {title}
      </Typography>

      {loading.initial ? (
        <DotsLoader/>
      ) : events.length > 0 ? (
        <div className={styles.results}>
          <EventsGrid
            events={events}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <div className={styles.noResults}>
          <NothingFoundMessage />
        </div>
      )}
    </div>
  );
};

export default CategoryTemplate;