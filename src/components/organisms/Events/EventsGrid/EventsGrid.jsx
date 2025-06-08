import React from 'react';
import EventCard from '@organisms/Events/EventCard/EventCard';
import styles from './EventsGrid.module.scss';
import Pagination from '@molecules/Events/Pagination/Pagination';

const EventsGrid = ({ events, page, totalPages, onPageChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        className={styles.grid}
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            locationName={event.location?.name || 'Место не указано'}
          />
        ))}
      </div>

      {page !== undefined && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default EventsGrid;
