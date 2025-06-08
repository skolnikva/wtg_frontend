import React, { useState } from 'react';
import ModalMap from '@atoms/ModalMap/ModalMap';
import { buildStaticMapUrl } from '@utils/mapUtils';
import Map from '@atoms/Map/Map';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './LocationMapCard.module.scss';

const LocationMapCard = ({ location, theme = 'light', showTitle = true, staticHeight = '120px' }) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const mapUrl = buildStaticMapUrl(location, theme);

  if (!location) return null;

  return (
    <>
      <div 
        className={styles.staticMapPreview} 
        style={{ height: staticHeight }}
        onClick={() => setIsMapModalOpen(true)}
      >
        <img
          src={mapUrl}
          alt={`Карта: ${location.address}`}
        />
      </div>

      <ModalMap isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)}>
        <div className={styles.interactiveMapContainer}>
          {showTitle && (
            <Typography variant="h3" className={styles.modalTitle}>
              {location.name}
            </Typography>
          )}
          <Map center={[location.latitude, location.longitude]} zoom={15} />
        </div>
      </ModalMap>
    </>
  );
};

export default LocationMapCard;