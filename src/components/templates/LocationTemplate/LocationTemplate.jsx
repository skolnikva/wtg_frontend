import React from 'react';
import Typography from '@atoms/Text/Typography/Typography';
import EventsGrid from '@organisms/Events/EventsGrid/EventsGrid';
import LocationMapCard from '@atoms/LocationMapCard/LocationMapCard';
import styles from './LocationTemplate.module.scss';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';

const LocationTemplate = ({ location, events, loading, page, totalPages, onPageChange }) => {
  if (loading) return <DotsLoader />;
  if (!location) return <div>Локация не найдена</div>;

  return (
    <div className={styles.locationPage}>
      <div className={styles.locationContent}>
        <div className={styles.locationDetails}>
          <Typography variant="h2" weight="bold">{location.name}</Typography>
          {location.address && (
            <Typography variant="h4" color="gray" className={styles.address}>
              {location.address}
            </Typography>
          )}
          {location.description && (
            <Typography variant="h3" weight="thin" className={styles.description}>
              {location.description}
            </Typography>
          )}
        </div>

        <div className={styles.mapWrapper}>
          <LocationMapCard 
            location={location}
            staticHeight="120px"
          />
        </div>
      </div>

      <Typography variant="h2" weight="bold" className={styles.upcomingTitle}>
        Предстоящие события
      </Typography>
      
      <EventsGrid 
        events={events} 
        loading={loading} 
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};


export default LocationTemplate;